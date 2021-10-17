const fs = require('fs');
const parseFrontMatter = require('gray-matter');
const unified = require('unified');
const rehypeParse = require('rehype-parse');
const rehypeStringify = require('rehype-stringify');
const rehypePrism = require('@mapbox/rehype-prism');
const link = require('rehype-autolink-headings');
const remarkHtml = require('remark-html');
const remarkParse = require('remark-parse');
const remarkSlug = require('remark-slug');
const remarkExternalLinks = require('remark-external-links');
const remarkAutolinkHeadings = require('remark-autolink-headings');
const kumaMacros = require('./kuma');
const path = require('path');

const externalLinks = require('./src/utils/plugins/external-links');
const walk = require('./src/utils/walk');
const findHeadings = require('./src/utils/find-headings');
const { unescape } = require('./src/utils/html-encoding');

// TODO: to config
const pathToOriginalContent = process.env.PATH_TO_ORIGINAL_CONTENT;
const sourceLocale = process.env.SOURCE_LOCALE;
const pathToLocalizedContent = process.env.PATH_TO_LOCALIZED_CONTENT;
const targetLocale = process.env.TARGET_LOCALE;

// TODO: to libs

const matchMacro = /\{\{(\w+)(?:\(([^{]+)\))?\}\}/g;
const matchArgument = /(?:"([^"]+)")|(?:'([^']+)')|(\d+)|(''|"")/g;
const parseArgs = (initialArgumentString) => {
  let argumentString = initialArgumentString;
  if (argumentString[0] === '&') {
    // Some macros are inside code sections, and their arguments are escaped... twice
    argumentString = unescape(unescape(initialArgumentString));
  }
  return [...argumentString.matchAll(matchArgument)].map(
    ([, str1, str2, num, emptyStr]) => {
      if (str1 || str2) {
        return str1 || str2;
      } else if (num) {
        return parseInt(num);
      } else if (emptyStr) {
        return '';
      }
      return undefined;
    }
  );
};
const hasSidebar = ([name]) => {
  const functionNames = {
    cssref: 'CSSRef',
    jssidebar: 'JsSidebar',
    jsref: 'JSRef',
  };
  return functionNames[name.toLowerCase()];
};

// Prepare HTML parser with necessary plugins
const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(link) // Wrap headings in links, so they became inteactive
  .use(externalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  })
  .use(rehypeStringify);

const mdHtmlProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypePrism) // Syntax highlighting in code blocks
  .use(rehypeStringify);

const markdownProcessor = unified()
  .use(remarkParse)
  .use([
    remarkSlug,
    [
      remarkExternalLinks,
      {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      },
    ],
    [
      remarkAutolinkHeadings,
      {
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            className: 'icon icon-link',
          },
        },
        linkProperties: {
          'aria-hidden': 'true',
        },
      },
    ],
  ])
  .use(remarkHtml);

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

const lookupMacro = (name) => {
  const lowercaseName = name.toLowerCase();
  return kumaMacros[lowercaseName] || undefined;
};

const runMacros = (content) => {
  let resultContent = content;
  const recognizedMacros = [...content.matchAll(matchMacro)];
  const data = {};

  recognizedMacros.map((expression) => {
    const [match, functionName, args] = expression;
    let result = match; // uninterpolated macros will be visible by default
    const macroFunction = lookupMacro(functionName);
    if (macroFunction) {
      if (args) {
        result = macroFunction(...parseArgs(args));
      } else {
        result = macroFunction();
      }
    }
    if (result !== match) {
      // don't spend processor cycles on replacing the same strings
      resultContent = resultContent.replace(match, result);
    }

    // add additional data for nav components
    const sidebarType = hasSidebar([functionName, args]);
    if (sidebarType) {
      data.hasSidebar = sidebarType;
    }
  });

  return {
    content: resultContent,
    data,
  };
};

const generateSlugToPathMap = (paths, locale) => {
  const map = {};

  paths.forEach((path) => {
    const localPath = path.split(locale.toLowerCase())[1];
    if (!localPath) {
      throw new Error(`Failed to get subpath for ${path}`);
    }

    map[localPath] = path;
  });

  return map;
};

const sectionPaths = {
  '/web/css': 'css',
  '/web/html': 'html',
  '/web/javascript': 'javascript',
  '/web/svg': 'svg',
  '/web/guide': 'guide',
};

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async ({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    addMetadata('settings', require('./gridsome.config').settings);

    // TODO: move this to a custom transformer
    const cssSourcePages = await walk(
      `${pathToOriginalContent}/${sourceLocale.toLowerCase()}/web/css`
    );

    const htmlSourcePages = await walk(
      `${pathToOriginalContent}/${sourceLocale.toLowerCase()}/web/html`
    );

    const javaScriptSourcePages = await walk(
      `${pathToOriginalContent}/${sourceLocale.toLowerCase()}/web/javascript`
    );

    const svgSourcePages = await walk(
      `${pathToOriginalContent}/${sourceLocale.toLowerCase()}/web/svg`
    );

    const guideSourcePages = await walk(
      `${pathToOriginalContent}/${sourceLocale.toLowerCase()}/web/guide`
    );

    const otherSourcePages = await walk(
      `${pathToOriginalContent}/${sourceLocale.toLowerCase()}/web/`,
      false
    );

    const originalContentFilenames = [
      ...cssSourcePages,
      ...htmlSourcePages,
      ...javaScriptSourcePages,
      ...svgSourcePages,
      ...guideSourcePages,
      ...otherSourcePages,
    ];
    // Displaying some general stats
    console.log('rendering pages...');
    console.table({
      'CSS Pages': cssSourcePages.length,
      'HTML Pages': htmlSourcePages.length,
      'JavaScript Pages': javaScriptSourcePages.length,
      'SVG Pages': svgSourcePages.length,
      Guides: guideSourcePages.length,
      'Other Pages': otherSourcePages.length,
    });

    const mapOfOriginalContent = generateSlugToPathMap(
      originalContentFilenames,
      sourceLocale
    );
    const localizedContentFilenames = await walk(
      `${pathToLocalizedContent}/${targetLocale.toLowerCase()}`
    );
    const mapOfLocalizedContent = generateSlugToPathMap(
      localizedContentFilenames,
      targetLocale
    );

    const collection = addCollection({
      typeName: 'MdnPage',
    });

    let pageCounter = 0;

    const addNodeToCollection = (
      { content, headings, data, path, section, originalPath },
      hasLocalizedContent = true
    ) => {
      const { content: processedContent, data: processedData } =
        runMacros(content);

      collection.addNode({
        content: hasLocalizedContent ? processedContent : '',
        headings,
        ...data,
        path,
        originalPath,
        section,
        sourceLastUpdatetAt: 0,
        translationLastUpdatedAt: 0,
        ...processedData,
      });
      pageCounter += 1;
      process.stdout.write(
        `Processed ${pageCounter} of ${originalContentFilenames.length} pages\r`
      );
    };

    const pages = Object.keys(mapOfOriginalContent)
      .filter((path) => /\.md/.test(path) || /\.html/.test(path)) // TODO: we'll need images here
      .filter((path) => !/\(/.test(path)) // TODO: fix vue router giving me an error on such paths
      .map(async (key) => {
        let path;
        let hasLocalizedContent;
        let mdKey;
        let htmlKey;

        if (key.slice(-3) === '.md') {
          mdKey = key;
          htmlKey = `${key.slice(0, -3)}.html`;
        } else if (key.slice(-5) === '.html') {
          mdKey = `${key.slice(0, -5)}.md`;
          htmlKey = key;
        }

        hasLocalizedContent =
          mapOfLocalizedContent[htmlKey] ||
          mapOfLocalizedContent[mdKey] ||
          false;

        if (hasLocalizedContent) {
          path = mapOfLocalizedContent[htmlKey] || mapOfLocalizedContent[mdKey];
        } else {
          path = mapOfOriginalContent[htmlKey] || mapOfOriginalContent[mdKey];
        }

        const originalFullPath =
          mapOfOriginalContent[htmlKey] || mapOfOriginalContent[mdKey];

        const sectionPath = Object.keys(sectionPaths).find(
          (pathPrefix) => key.indexOf(pathPrefix) >= 0
        );
        const section = sectionPath ? sectionPaths[sectionPath] : '';

        let headings;
        let content;
        let data;

        if (path.slice(-3) === '.md') {
          const input = await fs.promises.readFile(path);

          const parsedInfo = parseFrontMatter(input);
          data = parsedInfo.data;
          const { content: mdContent } = parsedInfo;

          const linkedContent = await markdownProcessor.process(mdContent); // wrap headings in links

          // TODO: Find a better way, I don't want to parse this thing twice
          const ast = mdHtmlProcessor.parse(linkedContent);
          headings = findHeadings(ast);

          const { contents } = await mdHtmlProcessor.process(linkedContent);
          content = contents;
        } else if (path.slice(-5) === '.html') {
          const input = await fs.promises.readFile(path);

          const parsedInfo = parseFrontMatter(input);
          const { content: htmlContent } = parsedInfo;
          data = parsedInfo.data;

          const linkedContent = await processor.process(htmlContent); // wrap headings in links

          // TODO: Find a better way, I don't want to parse this thing twice
          const ast = processor.parse(linkedContent.contents);
          headings = findHeadings(ast);
          content = processor.stringify(ast);
        }

        addNodeToCollection(
          {
            content,
            headings,
            data,
            path: `/${targetLocale}/docs/${data.slug}`,
            section,
            originalPath: originalFullPath.split(sourceLocale.toLowerCase())[1],
          },
          hasLocalizedContent
        );
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
          (_a, index) => index === headingIndex || index === headingIndex + 1
        )
        .map((node) => ({ ...node, depth: 4 }));

      const content = changelogProcessor.stringify(ast);

      const { contents: contentWithProcessedLinks } = await processor.process(
        content
      );

      const changelogCollection = addCollection({
        typeName: 'changelog',
      });

      changelogCollection.addNode({
        content: contentWithProcessedLinks,
      });
    };

    await Promise.all([...pages, changelogResolver()]);
  });

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
