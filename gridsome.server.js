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
      { content, headings, data, path, originalPath },
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
        ...processedData,
      });
      pageCounter += 1;
      process.stdout.write(
        `Processed ${pageCounter} of ${originalContentFilenames.length} pages\r`
      );
    };

    // TODO move this into a custom transformer or smth
    const htmlPages = Object.keys(mapOfOriginalContent)
      .filter((path) => /\.html/.test(path)) // TODO: we'll need images here
      .filter((path) => !/\(/.test(path)) // TODO: fix vue router giving me an error on such paths
      .map(async (key) => {
        const hasLocalizedContent = mapOfLocalizedContent[key] || false;
        let path = hasLocalizedContent
          ? mapOfLocalizedContent[key]
          : mapOfOriginalContent[key];
        const originalFullPath = mapOfOriginalContent[key];

        const input = await fs.promises.readFile(path);

        const parsedInfo = parseFrontMatter(input);
        const { content: htmlContent, data } = parsedInfo;

        const linkedContent = await processor.process(htmlContent); // wrap headings in links

        // TODO: Find a better way, I don't want to parse this thing twice
        const ast = processor.parse(linkedContent.contents);
        const headings = findHeadings(ast);

        addNodeToCollection(
          {
            content: processor.stringify(ast),
            headings,
            data,
            path: `/${targetLocale}/docs/${data.slug}`,
            originalPath: originalFullPath.split(sourceLocale.toLowerCase())[1],
          },
          hasLocalizedContent
        );
      });

    const mdPages = Object.keys(mapOfOriginalContent)
      .filter((path) => /\.md/.test(path)) // TODO: we'll need images here
      .filter((path) => !/\(/.test(path)) // TODO: fix vue router giving me an error on such paths
      .map(async (key) => {
        const hasLocalizedContent = mapOfLocalizedContent[key] || false;
        let path = hasLocalizedContent
          ? mapOfLocalizedContent[key]
          : mapOfOriginalContent[key];
        const originalFullPath = mapOfOriginalContent[key];

        const input = await fs.promises.readFile(path);

        const parsedInfo = parseFrontMatter(input);
        const { content: mdContent } = parsedInfo;

        const linkedContent = await markdownProcessor.process(mdContent); // wrap headings in links

        // TODO: Find a better way, I don't want to parse this thing twice
        const ast = mdHtmlProcessor.parse(linkedContent);
        const headings = findHeadings(ast);

        const { contents: content } = await mdHtmlProcessor.process(
          linkedContent
        );

        addNodeToCollection(
          {
            content,
            headings,
            data: parsedInfo.data,
            path: `/${targetLocale}/docs/${parsedInfo.data.slug}`,
            originalPath: originalFullPath.split(sourceLocale.toLowerCase())[1],
          },
          hasLocalizedContent
        );
      });

    await Promise.all([...htmlPages, ...mdPages]);
  });

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
