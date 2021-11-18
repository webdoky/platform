module.exports = function generalLinks(context, objectName) {
  const { registry, path: currentPagePath } = context;
  const pages = Array.from(registry.getPagesData());

  const generalPages = [
    pages.find(
      ({ data: { slug } }) => slug === 'Web/JavaScript/Reference/Global_Objects'
    ),
    pages.find(
      ({ data: { slug } }) =>
        slug === `Web/JavaScript/Reference/Global_Objects/${objectName}`
    ),
  ].filter(Boolean);

  const pageToNavItem = ({ path, data: { title } }) => ({
    title,
    path,
  });

  return [
    {
      items: generalPages.map(pageToNavItem),
      expanded: true,
    },
  ];
};
