const basePath = '/en-US/docs/Glossary/';

module.exports.default = (termName, displayName) => {
  const subPath = termName.replace(/\s+/g, '_');

  return `<a href="${basePath + subPath}">${displayName || termName}</a>`;
};
