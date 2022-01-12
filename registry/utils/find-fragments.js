const visit = require('unist-util-visit');

module.exports = (ast) => {
  const fragments = new Set();

  visit(
    ast,
    (node) => node.properties && node.properties.id,
    (node) => {
      fragments.add(node.properties.id);
    }
  );

  return fragments;
};
