const labels = require('./labels');

module.exports = function refTitleLinks({ targetLocale, path: currentPath }) {
  return [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference`,
      title: labels['Reference'],
    },
  ].map(({ path, ...otherAttrs }) => ({
    ...otherAttrs,
    path,
    isCurrent: path === currentPath,
  }));
};
