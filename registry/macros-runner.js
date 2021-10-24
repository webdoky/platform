const kumaMacros = require('../kuma');
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

const hasSidebar = ([name]) => {
  const functionNames = {
    cssref: 'CSSRef',
    jssidebar: 'JsSidebar',
    jsref: 'JSRef',
  };
  return functionNames[name.toLowerCase()];
};

const lookupMacro = (name) => {
  const lowercaseName = name.toLowerCase();
  return kumaMacros[lowercaseName] || undefined;
};

const runMacros = (content) => {
  let resultContent = content;
  const recognizedMacros = [...content.matchAll(matchMacro)];
  const data = {};

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
    if (result !== match) {
      // don't spend processor cycles on replacing the same strings
      resultContent = resultContent.replace(match, result);
    }

    // add additional data for nav components
    const sidebarType = hasSidebar([functionName, args]);
    if (sidebarType) {
      data.hasSidebar = sidebarType;
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
