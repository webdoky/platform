const fs = require('fs');
const parse = require('gray-matter');

const walk = require('./src/utils/walk')

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async ({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('settings', require('./gridsome.config').settings);

    const mdnContentPath = '../mdn-content/files'; // TODO: move this into config?
    const locale = 'en-US'
    const mdnContentFilenames = await walk(mdnContentPath); // TODO: move this to a custom transformer

    const collection = addCollection({
      typeName: 'MdnPage',
    });

    const addingNodes = mdnContentFilenames
      .filter(path => /\.html/.test(path)) // TODO: we'll need images here, + .md too
      .filter(path => !/\(/.test(path)) // TODO: fix vue router giving me an error on such paths
      .map(async path => {
        const input = await fs.promises.readFile(path)

        const parsedInfo = parse(input);
        const { content } = parsedInfo;
        // console.log(parsedInfo, path, 'data??')
        collection.addNode({
          content,
          ...parsedInfo.data,
          path: `/${locale}/docs/${parsedInfo.data.slug}`
        });
      })

    await Promise.all(addingNodes);
  });

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
}
