const fs = require('fs');
const parseFrontMatter = require('gray-matter');
const unified = require('unified');
const rehypeParse = require('rehype-parse');
const rehypeStringify = require('rehype-stringify');
const link = require('rehype-autolink-headings');
const remarkHtml = require('remark-html');
const remarkParse = require('remark-parse');
const remarkSlug = require('remark-slug');
const remarkExternalLinks = require('remark-external-links');
const remarkAutolinkHeadings = require('remark-autolink-headings');
const { CSSRef } = require('./kuma')

const walk = require('./src/utils/walk')
const findHeadings = require('./src/utils/find-headings')

// Prepare HTML parser with necessary plugins
const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(link) // Wrap headings in links, so they became inteactive
  .use(rehypeStringify);

const markdownProcessor = unified()
  .use(remarkParse)
  .use([
    remarkSlug,
    [remarkExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    }],
    [remarkAutolinkHeadings, {
      content: {
        type: 'element',
        tagName: 'span',
        properties: {
          className: 'icon icon-link'
        }
      },
      linkProperties: {
        'aria-hidden': 'true'
      },
    }]
  ])
  .use(remarkHtml)

const runMacros = (content) => {
  let resultContent = content;

  if (resultContent.indexOf('{{CSSRef}}') >= 0) {
    resultContent = resultContent.replace('{{CSSRef}}', CSSRef(content));
  }

  return resultContent
}

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

    const addNodeToCollection = ({
      content,
      headings,
      data,
      path,
    }) => {
      let showSidebar = undefined;

      if (content.indexOf('{{CSSRef}}') >= 0) {
        showSidebar = 'CSSRef';
      }

      collection.addNode({
        content: runMacros(content),
        headings,
        ...data,
        path,
        showSidebar,
      });
    }

    // TODO move this into a custom transformer or smth
    const htmlPages = mdnContentFilenames
      .filter(path => /\.html/.test(path)) // TODO: we'll need images here
      .filter(path => !/\(/.test(path)) // TODO: fix vue router giving me an error on such paths
      .map(async path => {
        const input = await fs.promises.readFile(path)

        const parsedInfo = parseFrontMatter(input);
        const { content: htmlContent } = parsedInfo;

        const linkedContent = await processor.process(htmlContent); // wrap headings in links

        // TODO: Find a better way, I don't want to parse this thing twice
        const ast = processor.parse(linkedContent.contents);
        const headings = findHeadings(ast);

        addNodeToCollection({
          content: processor.stringify(ast),
          headings,
          data: parsedInfo.data,
          path: `/${locale}/docs/${parsedInfo.data.slug}`
        });
      });

    const mdPages = mdnContentFilenames
      .filter(path => /\.md/.test(path)) // TODO: we'll need images here
      .filter(path => !/\(/.test(path)) // TODO: fix vue router giving me an error on such paths
      .map(async path => {
        const input = await fs.promises.readFile(path)

        const parsedInfo = parseFrontMatter(input);
        const { content: mdContent } = parsedInfo;

        const linkedContent = await markdownProcessor.process(mdContent); // wrap headings in links

        // TODO: Find a better way, I don't want to parse this thing twice
        const ast = processor.parse(linkedContent);
        const headings = findHeadings(ast);

        addNodeToCollection({
          content: processor.stringify(ast),
          headings,
          data: parsedInfo.data,
          path: `/${locale}/docs/${parsedInfo.data.slug}`
        });
      });

    await Promise.all([...htmlPages, ...mdPages]);
  });

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
}
