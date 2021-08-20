const {
  default: cssref,
  navLabels: CSSRefLabels,
} = require('./macros/css-ref');
const {
  default: jssidebar,
  navLabels: JSRefLabels,
} = require('./macros/js-sidebar');
const {
  default: jsref,
  inheritanceData,
  groupData,
  navLabels: JSRefNavLabels,
} = require('./macros/js-ref');
const { default: readonlyinline } = require('./macros/read-only-inline');
const { default: glossary } = require('./macros/glossary');
const { default: jsxref } = require('./macros/jsxref');

module.exports = {
  cssref,
  jssidebar,
  jsref,
  readonlyinline,
  glossary,
  jsxref,

  // TODO: make these pluggable?
  CSSRefLabels,
  JSRefLabels,
  inheritanceData,
  groupData,
  JSRefNavLabels,
};
