const labels = require('./labels');

module.exports = function generalLinks({ path: currentPath, targetLocale }) {
  return [
    {
      path: `/${targetLocale}/docs/Web/JavaScript`,
      title: labels['JavaScript'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Tutorials`,
      title: labels['Tutorials'],
    },
  ].map(({ path, ...otherAttrs }) => ({
    ...otherAttrs,
    path,
    isCurrent: path === currentPath,
  }));
};
