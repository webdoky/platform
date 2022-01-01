const visit = require('unist-util-visit');

const getTextContent = (node) => {
  let textContent = '';
  const children = node.children || [];

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];
    const { value, children: nodeChildren } = childNode;
    if (value) {
      textContent += value;
    } else if (nodeChildren) {
      textContent += getTextContent(childNode);
    }
  }

  return textContent;
};

module.exports = (ast) => {
  let description = '';

  visit(
    ast,
    (node) => !description && node.tagName === 'p',
    (node) => {
      const nodeText = getTextContent(node);
      if (!nodeText.startsWith('{{')) {
        // Omit macros
        description = nodeText;
      }
    }
  );

  return description;
};
