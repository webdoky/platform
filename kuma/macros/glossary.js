const locale = process.env.TARGET_LOCALE; // TODO: move this into initilizer
const basePath = `/${locale}/docs/Glossary/`;

module.exports.default = (termName, displayName) => {
  const subPath = termName.replace(/\s+/g, '_');

  return `<a href="${basePath + subPath}">${displayName || termName}</a>`;
};
