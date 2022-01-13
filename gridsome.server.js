const perfMon = require('./registry/perf-mon');
perfMon.start();

const fs = require('fs');
const unified = require('unified');
const rehypeParse = require('rehype-parse');
const rehypeStringify = require('rehype-stringify');
const link = require('rehype-autolink-headings');
const remarkHtml = require('remark-html');
const remarkParse = require('remark-parse');
const remarkExternalLinks = require('remark-external-links');
const path = require('path');

const externalLinks = require('./registry/utils/plugins/external-links');
const { registry } = require('./registry');

const { popularitiesJson } = require('@webdoky/yari-ports');
const { sourceLocale, targetLocale } = require('./registry/config');
const graphqlSchemaTypes = require('./types');
const excludedUrls = require('./noindex-urls');

// TODO: to config
const pathToLocalizedContent = process.env.PATH_TO_LOCALIZED_CONTENT;

const isExternalLink = (ref) =>
  ref.startsWith('http://') || ref.startsWith('https://');

// Prepare HTML parser with necessary plugins
const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(link) // Wrap headings in links, so they became inteactive
  .use(externalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify);

const changelogProcessor = unified()
  .use(remarkParse)
  .use([
    [
      remarkExternalLinks,
      {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      },
    ],
  ])
  .use(remarkHtml);

perfMon.markAndMeasure('Dependencies loaded', 'timerStart', 'depLoad');

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async ({ addCollection, addSchemaTypes, addMetadata }) => {
    perfMon.mark('loadingSourcesStart');
    let orphanedLinksCount = 0;
    let contentExcludedFromSitemap = 0;
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('settings', require('./gridsome.config').settings);

    // Loading registry with content pages
    await registry.init();

    perfMon.markAndMeasure(
      'Source Files Loaded:',
      'loadingSourcesStart',
      'loadingSourcesEnd'
    );

    addSchemaTypes(graphqlSchemaTypes);

    const collection = addCollection({
      typeName: 'MdnPage',
    });

    perfMon.markAndMeasure(
      'Prepared Base For Building Registry:',
      'loadingSourcesEnd',
      'startProcessingPages'
    );

    for (page of registry.getPagesData()) {
      const {
        content,
        description,
        headings,
        data,
        path,
        section,
        references,
        updatesInOriginalRepo,
        originalPath,
      } = page;

      // Perform some additional validation on the content before starting generating website structure
      const pageUrl = `${path}/`;

      // Check if the page is excluded from sitemap
      if (content && excludedUrls.includes(pageUrl)) {
        contentExcludedFromSitemap++;
        console.warn(
          '\x1b[33mwarn\x1b[0m',
          `- content page is excluded from sitemap: ${path}`
        );
      }

      // Check if links in the content lead to sensible destinations
      const { internalLinkDestinations } = registry;
      references.forEach((refItem) => {
        if (
          !isExternalLink(refItem) &&
          !internalLinkDestinations.has(refItem)
        ) {
          orphanedLinksCount++;
          console.warn(
            '\x1b[33mwarn\x1b[0m',
            `- found orphaned reference: ${refItem} on page ${path}`
          );
        }
      });

      collection.addNode({
        content,
        description,
        hasContent: !!content,
        headings,
        ...data,
        path,
        originalPath,
        updatesInOriginalRepo,
        section,
        sourceLastUpdatetAt: 0,
        translationLastUpdatedAt: 0,
      });
    }

    if (orphanedLinksCount > 0) {
      console.warn(
        `\x1b[33mfound ${orphanedLinksCount} orphaned reference${
          orphanedLinksCount > 1 ? 's' : ''
        }\x1b[0m`
      );
    }
    if (contentExcludedFromSitemap > 0) {
      console.warn(
        `\x1b[33m${contentExcludedFromSitemap} page${
          contentExcludedFromSitemap > 1 ? 's' : ''
        } excluded from sitemap\x1b[0m`
      );
    }

    // Loading changelog
    const changelogCollection = addCollection({
      typeName: 'changelog',
    });

    const changelogResolver = async () => {
      const changeLogPath = path.resolve(
        `${pathToLocalizedContent}/../CHANGELOG.md`
      );
      const input = await fs.promises.readFile(changeLogPath);

      const ast = await changelogProcessor.parse(input);

      const headingIndex = ast.children.findIndex(
        ({ type, depth }) => type === 'heading' && depth === 2
      );

      ast.children = ast.children
        .filter(
          (_a, index) => index >= headingIndex && index < headingIndex + 4 // two latest versions
        )
        .map((node) => ({ ...node, depth: 4 }));

      const content = changelogProcessor.stringify(ast);

      const { contents: contentWithProcessedLinks } = await processor.process(
        content
      );

      changelogCollection.addNode({
        content: contentWithProcessedLinks,
      });
    };

    await Promise.all([changelogResolver()]);

    // Popularities
    const popularitiesCollection = addCollection({
      typeName: 'popularity',
    });
    const popularities = popularitiesJson;

    Object.keys(popularitiesJson)
      .filter((key) => key.includes(sourceLocale))
      .forEach((key) => {
        popularitiesCollection.addNode({
          link: key.replace(`/${sourceLocale}/`, `/${targetLocale}/`),
          popularity: popularities[key],
        });
      });

    perfMon.markAndMeasure(
      'Added Pages To GrapQL registry:',
      'startProcessingPages',
      'endProcessingPages'
    );
  });

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
