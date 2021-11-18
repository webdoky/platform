const labels = require('./labels');

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

module.exports = function refSections({
  path: currentPath,
  registry,
  targetLocale,
}) {
  const jsPages = Array.from(registry.getPagesData()).filter(
    ({ path }) =>
      path.indexOf(`/${targetLocale}/docs/Web/JavaScript/Reference/`) >= 0
  );

  const globalObjectsPages = jsPages.filter(
    ({ path }) =>
      path.indexOf(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects`
      ) >= 0
  );
  const operatorsPages = jsPages.filter(
    ({ path }) =>
      path.indexOf(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Operators`
      ) >= 0
  );
  const statementsPages = jsPages.filter(
    ({ path }) =>
      path.indexOf(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Statements`
      ) >= 0
  );
  const functionsPages = jsPages.filter(
    ({ path }) =>
      path.indexOf(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Functions`
      ) >= 0
  );
  const classesPages = jsPages.filter(
    ({ path }) =>
      path.indexOf(`/${targetLocale}/docs/Web/JavaScript/Reference/Classes`) >=
      0
  );
  const errorsPages = jsPages.filter(
    ({ path }) =>
      path.indexOf(`/${targetLocale}/docs/Web/JavaScript/Reference/Errors`) >= 0
  );

  const morePages = [
    {
      path: `/${targetLocale}/docs/Web/JavaScript/JavaScript_technologies_overview`,
      title: labels['Overview'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Lexical_grammar`,
      title: labels['Lexical_grammar'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Data_structures`,
      title: labels['Data_structures'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Enumerability_and_ownership_of_properties`,
      title: labels['Enumerability'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Iteration_protocols`,
      title: labels['Iteration_protocols'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Strict_mode`,
      title: labels['Strict_mode'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode`,
      title: labels['Transitioning_to_strict_mode'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Template_literals`,
      title: labels['Template_strings'],
    },
    {
      path: `/${targetLocale}/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features`,
      title: labels['Deprecated_features'],
    },
  ];

  const pageToNavItem = ({ path, data: { title } }) => ({
    title,
    path,
    isCurrent: path === currentPath,
  });

  return [
    {
      title: labels['Global_Objects'],
      items: globalObjectsPages.map(pageToNavItem).sort(sortByTitle),
      expanded: globalObjectsPages.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Operators'],
      items: operatorsPages.map(pageToNavItem).sort(sortByTitle),
      expanded: operatorsPages.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Statements'],
      items: statementsPages.map(pageToNavItem).sort(sortByTitle),
      expanded: statementsPages.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Functions'],
      items: functionsPages.map(pageToNavItem).sort(sortByTitle),
      expanded: functionsPages.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Classes'],
      items: classesPages.map(pageToNavItem).sort(sortByTitle),
      expanded: classesPages.find(({ path }) => path === currentPath),
    },
    {
      title: labels['Errors'],
      items: errorsPages.map(pageToNavItem).sort(sortByTitle),
      expanded: errorsPages.find(({ path }) => path === currentPath),
    },
    {
      title: labels['More'],
      items: morePages,
      expanded: morePages.find(({ path }) => path === currentPath),
    },
  ];
};
