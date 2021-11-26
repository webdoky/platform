function glossary(termName, displayName) {
  const { targetLocale } = this;
  const basePath = `/${targetLocale}/docs/Glossary/`;

  const subPath = termName.replace(/\s+/g, '_');

  return `<a href="${basePath + subPath}">${displayName || termName}</a>`;
}

module.exports.default = glossary;
