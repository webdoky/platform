const {
  default: CSSRef,
  navLabels: CSSRefLabels,
} = require('./macros/css-ref');
const {
  default: JsSidebar,
  navLabels: JSRefLabels,
} = require('./macros/js-sidebar');
const {
  default: JSRef,
  inheritanceData,
  groupData,
  navLabels: JSRefNavLabels,
} = require('./macros/js-ref');

module.exports = {
  CSSRef,
  CSSRefLabels,
  JsSidebar,
  JSRefLabels,
  JSRef,
  inheritanceData,
  groupData,
  JSRefNavLabels,
};
