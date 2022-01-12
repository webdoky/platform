const visit = require('unist-util-visit');

module.exports = (ast) => {
  const references = new Set();

  visit(
    ast,
    (node) => node.tagName === 'a',
    (node) => {
      if (node.properties && node.properties.href) {
        references.add(node.properties.href);
      }
    }
  );

  return references;
};
