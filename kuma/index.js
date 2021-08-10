const {
  default: CSSRef,
  navLabels: CSSRefLabels,
} = require('./macros/css-ref');
const {
  default: JsSidebar,
  default: jsSidebar,
  navLabels: JSRefLabels,
} = require('./macros/js-sidebar');
const {
  default: JSRef,
  inheritanceData,
  groupData,
  navLabels: JSRefNavLabels,
} = require('./macros/js-ref');
const { default: ReadOnlyInline } = require('./macros/read-only-inline');

module.exports = {
  CSSRef,
  CSSRefLabels,
  JsSidebar,
  jsSidebar, // compatibility. TODO: maybe rework to ignore case?
  JSRefLabels,
  JSRef,
  inheritanceData,
  groupData,
  JSRefNavLabels,
  ReadOnlyInline,
};
