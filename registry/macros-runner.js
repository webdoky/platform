const {
  kuma: { macros: Macros, parseMacroArgs, extractMacros },
} = require('@webdoky/yari-ports');

// List of macros that should be processed anyway, i.e for rendering navigation
navigationalMacros = ['cssref', 'jssidebar', 'jsref'];

const runMacros = (content, context, navigationOnly = false) => {
  const { path } = context;
  let resultContent = content;
  const recognizedMacros = extractMacros(content);
  const data = {
    macros: [],
  };
  const failedMacros = {};

  const macrosRegistry = new Macros(context);

  recognizedMacros.map((expression) => {
    const { match, functionName, args } = expression;

    if (
      !navigationOnly ||
      navigationalMacros.includes(functionName.toLowerCase())
    ) {
      let result = match; // uninterpolated macros will be visible by default
      const macroFunction = macrosRegistry.lookup(functionName);
      if (macroFunction) {
        try {
          if (args) {
            result = macroFunction(...parseMacroArgs(args));
          } else {
            result = macroFunction();
          }
        } catch (e) {
          throw new Error(
            `Error while processing page ${path} with macro {{${functionName}${
              args ? `(${args})` : ''
            }}}. Original error: ${e.message}`
          );
        }
      } else {
        if (failedMacros[functionName]) {
          failedMacros[functionName].count += 1;
          failedMacros[functionName].lastUsedExpression = match;
        } else {
          failedMacros[functionName] = {
            count: 1,
            lastUsedExpression: match,
          };
        }
      }
      if (typeof result !== 'string') {
        // if the output is not a string, then we have to additionaly process it in the app
        // so put it into data layer instead
        data.macros.push({
          macro: functionName.toLowerCase(),
          result: JSON.stringify(result),
        });

        result = '';
      }
      if (result !== match) {
        // don't spend processor cycles on replacing the same strings
        resultContent = resultContent.replace(match, result);
      }
    }
  });

  const numberOfFailedMacros = Object.keys(failedMacros).length;
  if (numberOfFailedMacros) {
    console.warn(`Got ${numberOfFailedMacros} failed macros`);
    Object.entries(failedMacros).forEach(([functionName, entry]) => {
      console.warn(
        `\x1b[33m${entry.count} failed ${functionName} macros, the last expression was: ${entry.lastUsedExpression}\x1b[0m`
      );
    });
  }
  return {
    content: resultContent,
    data,
  };
};

module.exports = {
  runMacros,
};
