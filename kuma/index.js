const { default: cssref } = require('./macros/css-ref');
const { default: jssidebar } = require('./macros/js-sidebar');
const { default: jsref } = require('./macros/js-ref');
const { default: readonlyinline } = require('./macros/read-only-inline');
const { default: glossary } = require('./macros/glossary');
const { default: jsxref } = require('./macros/jsxref');

module.exports = function (context) {
  const macroDictionary = {
    cssref,
    jssidebar,
    jsref,
    readonlyinline,
    glossary,
    jsxref,
  };

  // Attach outside context, like page registry or locale info to all macro functions
  Object.keys(macroDictionary).forEach((key) => {
    macroDictionary[key] = macroDictionary[key].bind(context);
  });

  const lookupMacro = (name) => {
    const lowercaseName = name.toLowerCase();
    return macroDictionary[lowercaseName] || undefined;
  };

  return {
    macroDictionary,
    lookupMacro,
  };
};
