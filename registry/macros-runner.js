const KumaMacros = require('../kuma');
const { unescape } = require('./utils/html-encoding');

const matchMacro = /\{\{(\w+)(?:\(([^{]+)\))?\}\}/g;
const matchArgument = /(?:"([^"]+)")|(?:'([^']+)')|(\d+)|(''|"")/g;

const parseArgs = (initialArgumentString) => {
  let argumentString = initialArgumentString;
  if (argumentString[0] === '&') {
    // Some macros are inside code sections, and their arguments are escaped... twice
    argumentString = unescape(unescape(initialArgumentString));
  }
  return [...argumentString.matchAll(matchArgument)].map(
    ([, str1, str2, num, emptyStr]) => {
      if (str1 || str2) {
        return str1 || str2;
      } else if (num) {
        return parseInt(num);
      } else if (emptyStr) {
        return '';
      }
      return undefined;
    }
  );
};

const runMacros = (content, context) => {
  let resultContent = content;
  const recognizedMacros = [...content.matchAll(matchMacro)];
  const data = {
    macros: [],
  };

  const macrosRegistry = new KumaMacros(context);
  const lookupMacro = macrosRegistry.lookupMacro;

  recognizedMacros.map((expression) => {
    const [match, functionName, args] = expression;
    let result = match; // uninterpolated macros will be visible by default
    const macroFunction = lookupMacro(functionName);
    if (macroFunction) {
      if (args) {
        result = macroFunction(...parseArgs(args));
      } else {
        result = macroFunction();
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
  });

  return {
    content: resultContent,
    data,
  };
};

module.exports = {
  runMacros,
};
