const generalLinks = require('./section-general');
const { inheritanceData, groupData } = require('./static');

const labels = {
  properties: 'Властивості',
  methods: 'Методи',
};

function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
  return titleA.localeCompare(titleB);
}

function jsRefMacro() {
  const context = this;
  const { registry, slug, path: currentPagePath, targetLocale } = context;
  const pages = Array.from(registry.getPagesData());

  let objectName = slug
    .replace('Web/JavaScript/Reference/Global_Objects/', '')
    .split('/')[0];

  // TODO: generalize this?
  // Exceptions, we want the main object in the sidebar (e.g. Int8Array -> TypedArray)
  if (groupData['TypedArray'].indexOf(objectName) != -1) {
    objectName = 'TypedArray';
  }
  if (groupData['Error'].indexOf(objectName) != -1) {
    objectName = 'Error';
  }
  if (groupData['Proxy'].indexOf(objectName) != -1) {
    objectName = 'Proxy/handler';
  }

  const inheritance = inheritanceData[objectName] || inheritanceData.default;

  var group = [];
  for (let g in groupData) {
    var index = groupData[g].indexOf(objectName);
    if (index != -1) {
      group = groupData[g];
      group.splice(index, 1);
      break;
    }
  }

  const source = {};
  const navigationStructure = {};
  const globalObjectsPages = pages.filter(
    ({ path }) =>
      path.indexOf(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects`
      ) >= 0
  );
  source[objectName] = globalObjectsPages.filter(
    ({ path }) =>
      path.indexOf(
        `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/${objectName}/`
      ) >= 0
  );
  navigationStructure[objectName] = {
    title: objectName,
    methods: [],
    properties: [],
  };
  if (inheritance.indexOf('Function') > -1) {
    source['iFunction'] = globalObjectsPages.filter(
      ({ path }) =>
        path.indexOf(
          `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/Function`
        ) >= 0
    );
    navigationStructure['iFunction'] = {
      title: 'Function',
      methods: [],
      properties: [],
    };
  }
  if (inheritance.indexOf('Object') > -1) {
    source['iObject'] = globalObjectsPages.filter(
      ({ path }) =>
        path.indexOf(
          `/${targetLocale}/docs/Web/JavaScript/Reference/Global_Objects/Object`
        ) >= 0
    );
    navigationStructure['iObject'] = {
      title: 'Object',
      methods: [],
      properties: [],
    };
  }

  let pageList;
  let isObj;
  let includeme;

  for (let object in source) {
    pageList = source[object];
    if (object == 'iObject') {
      isObj = true;
    }
    for (let aPage in pageList) {
      includeme = isObj
        ? pageList[aPage].data.tags?.includes('Prototype')
        : true;

      if (pageList[aPage].data.tags?.includes('Property') && includeme) {
        navigationStructure[object].properties.push(pageList[aPage]);
      }

      if (pageList[aPage].data.tags?.includes('Method') && includeme) {
        navigationStructure[object].methods.push(pageList[aPage]);
      }
    }
  }

  const { properties, methods } = navigationStructure[objectName];
  const { properties: objectProperties, methods: objectMethods } =
    navigationStructure['iObject'] || {};
  const { properties: functionProperties, methods: functionMethods } =
    navigationStructure['iFunction'] || {};

  const pageToNavItem = ({ path, data: { title } }) => ({
    title,
    path,
    isCurrent: path === currentPagePath,
  });

  return [
    {
      sections: generalLinks(context, objectName),
    },
    {
      sections: [
        {
          title: labels['properties'],
          items: properties.map(pageToNavItem).sort(sortByTitle),
          expanded: properties.find(({ path }) => path === currentPagePath),
        },
        {
          title: labels['methods'],
          items: methods.map(pageToNavItem).sort(sortByTitle),
          expanded: methods.find(({ path }) => path === currentPagePath),
        },
      ],
    },
    {
      title: 'Успадковані властивості',
      groupItems: [
        {
          title: 'Функція',
          sections: objectProperties
            ? [
                {
                  title: labels['properties'],
                  items: objectProperties.map(pageToNavItem).sort(sortByTitle),
                  expanded: objectProperties.find(
                    ({ path }) => path === currentPagePath
                  ),
                },
                {
                  title: labels['methods'],
                  items: objectMethods.map(pageToNavItem).sort(sortByTitle),
                  expanded: objectMethods.find(
                    ({ path }) => path === currentPagePath
                  ),
                },
              ]
            : [],
        },
        {
          title: "Об'єкт",
          sections: functionProperties
            ? [
                {
                  title: labels['properties'],
                  items: functionProperties
                    .map(pageToNavItem)
                    .sort(sortByTitle),
                  expanded: functionProperties.find(
                    ({ path }) => path === currentPagePath
                  ),
                },
                {
                  title: labels['methods'],
                  items: functionMethods.map(pageToNavItem).sort(sortByTitle),
                  expanded: functionMethods.find(
                    ({ path }) => path === currentPagePath
                  ),
                },
              ]
            : [],
        },
      ],
    },
  ];
}

module.exports.default = jsRefMacro;
