const refBasePath = `/en-US/docs/Web/JavaScript/Reference/`;
const initialSlug = 'Global_Objects';
const refContentSections = [
  'about',
  'classes',
  'deprecated_and_obsolete_features',
  'errors',
  'functions',
  'global_objects',
  'iteration_protocols',
  'lexical_grammar',
  'operators',
  'statements',
  'strict_mode',
  'template_literals',
  'trailing_commas',
];

module.exports.default = (
  termName,
  displayName,
  anchor = '',
  dontWrapInCode = false
) => {
  let basePath = refBasePath;
  let slug;

  const possibleRefSectionName = termName.split('/')[0];
  if (refContentSections.indexOf(possibleRefSectionName.toLowerCase()) > -1) {
    slug = '';
  } else {
    slug = initialSlug;
  }

  const addressWithoutSection = termName
    .replace('()', '')
    .replace('.prototype.', '.');
  const address = `${slug ? slug + '/' : ''}${addressWithoutSection}`;

  if (address.indexOf('..') === -1 && address.indexOf('.') !== -1) {
    basePath = `${basePath}${address.replace('.', '/')}`;
  } else {
    basePath = `${basePath}${decodeURIComponent(address)}`;
  }

  let encodedAnchor = anchor;
  if (anchor && anchor[0] != '#') {
    encodedAnchor = '#' + anchor;
  }

  let content = displayName || termName;
  if (!dontWrapInCode) {
    content = `<code>${content}</code>`;
  }

  return `<a href="${basePath + encodedAnchor}">${content}</a>`;
};
