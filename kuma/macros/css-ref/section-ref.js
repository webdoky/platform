const labels = require('./labels');

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

module.exports = function refSections({ path: currentPath, registry }) {
  const cssPages = Array.from(registry.getPagesData()).filter(
    ({ section }) => section === 'css'
  );

  const standardPages = cssPages.filter(
    ({ data: { tags = [] } }) => !tags.includes('Non-standard')
  );

  const groups = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('Overview')
  );
  const properties = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('CSS Property')
  );
  const selectors = standardPages.filter(
    ({ data: { tags = [] } }) =>
      tags.includes('Selector') &&
      !tags.includes('Pseudo-element') &&
      !tags.includes('Pseudo-class')
  );
  const pseudoClasses = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('Pseudo-class')
  );
  const pseudoElements = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('Pseudo-element')
  );
  const atRules = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('At-rule')
  );
  const types = standardPages.filter(({ data: { tags = [] } }) =>
    tags.includes('CSS Data Type')
  );

  const pageToNavItem = ({ path, data: { title } }) => ({
    title,
    path,
    isCurrent: path === currentPath,
  });

  return [
    {
      title: labels['Modules'],
      items: groups.map(pageToNavItem).sort(sortByTitle),
      expanded: !!groups.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Properties'],
      items: properties.map(pageToNavItem).sort(sortByTitle),
      expanded: !!properties.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Selectors'],
      items: selectors.map(pageToNavItem).sort(sortByTitle),
      expanded: !!selectors.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Pseudo-classes'],
      items: pseudoClasses.map(pageToNavItem).sort(sortByTitle),
      expanded: !!pseudoClasses.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Pseudo-elements'],
      items: pseudoElements.map(pageToNavItem).sort(sortByTitle),
      expanded: !!pseudoElements.find(({ path }) => path === currentPath),
    },
    {
      title: labels['At-rules'],
      items: atRules.map(pageToNavItem).sort(sortByTitle),
      expanded: !!atRules.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Types'],
      items: types.map(pageToNavItem).sort(sortByTitle),
      expanded: !!types.find(({ path }) => path === currentPath),
    },
  ];
};
