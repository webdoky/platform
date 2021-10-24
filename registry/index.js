const remarkSlug = require('remark-slug');
const remarkAutolinkHeadings = require('remark-autolink-headings');
const parseFrontMatter = require('gray-matter');
const rehypePrism = require('@mapbox/rehype-prism');
const unified = require('unified');
const fs = require('fs');

const rehypeParse = require('rehype-parse');
const rehypeStringify = require('rehype-stringify');
const link = require('rehype-autolink-headings');
const remarkHtml = require('remark-html');
const remarkParse = require('remark-parse');
const remarkExternalLinks = require('remark-external-links');

const externalLinks = require('./utils/plugins/external-links');
const walk = require('./utils/walk');
const findHeadings = require('./utils/find-headings');
const { runMacros } = require('./macros-runner');
const {
  sourceLocale,
  pathToOriginalContent,
  targetLocale,
  pathToLocalizedContent,
} = require('./config');

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

const generateSlugToPathMap = (paths, locale) => {
  const map = new Map();

  paths.forEach((path) => {
    const localPath = path.split(locale.toLowerCase())[1];
    if (!localPath) {
      throw new Error(`Failed to get subpath for ${path}`);
    }

    map.set(localPath, path);
  });

  return map;
};

const registry = {
  localizedContentMap: undefined,
  contentPages: new Map(),
  estimatedContentPagesAmount: 0,

  getPagesData() {
    return this.contentPages.values();
  },

  async init() {
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

    const localizedContentPages = await walk(
      `${pathToLocalizedContent}/${targetLocale.toLowerCase()}`
    );

    this.localizedContentMap = generateSlugToPathMap(
      localizedContentPages,
      targetLocale
    );

    console.log('rendering pages...');
    const cssProcessingTasks = await this.processSection(cssSourcePages, 'css');
    const htmlProcessingTasks = await this.processSection(
      htmlSourcePages,
      'html'
    );
    const javascriptProcessingTasks = await this.processSection(
      javaScriptSourcePages,
      'javascript'
    );
    const svgProcessingTasks = await this.processSection(svgSourcePages, 'svg');
    const guideProcessingTasks = await this.processSection(
      guideSourcePages,
      'guide'
    );
    const otherPagesProcessingTasks = await this.processSection(
      otherSourcePages,
      ''
    );
    console.table({
      'CSS Pages': cssProcessingTasks.length,
      'HTML Pages': htmlProcessingTasks.length,
      'JavaScript Pages': javascriptProcessingTasks.length,
      'SVG Pages': svgProcessingTasks.length,
      Guides: guideProcessingTasks.length,
      'Other Pages': otherPagesProcessingTasks.length,
    });
    const aggregatedTasks = [
      ...cssProcessingTasks,
      ...htmlProcessingTasks,
      ...javascriptProcessingTasks,
      ...svgProcessingTasks,
      ...guideProcessingTasks,
      ...otherPagesProcessingTasks,
    ];
    this.estimatedContentPagesAmount = aggregatedTasks.length;
    await Promise.all(aggregatedTasks);
  },

  async processSection(originalPaths, sectionName) {
    const mapOfOriginalContent = generateSlugToPathMap(
      originalPaths,
      sourceLocale
    );
    const tasks = [];

    for ([slug, path] of mapOfOriginalContent) {
      if (/\(/.test(path)) {
        // TODO: fix vue router giving me an error on such paths
        continue;
      }
      if (path.slice(-2) === 'md' || path.slice(-4) === 'html') {
        // TODO: we'll need images here
        tasks.push(this.processPage(slug, mapOfOriginalContent, sectionName));
      }
    }

    return tasks;
  },

  async processPage(key, mapOfOriginalContent, sectionName) {
    const mapOfLocalizedContent = this.localizedContentMap;
    let mdKey;
    let htmlKey;

    if (key.slice(-3) === '.md') {
      mdKey = key;
      htmlKey = `${key.slice(0, -3)}.html`;
    } else if (key.slice(-5) === '.html') {
      mdKey = `${key.slice(0, -5)}.md`;
      htmlKey = key;
    }

    // default to localized content path
    const originalFullPath =
      mapOfOriginalContent.get(htmlKey) || mapOfOriginalContent.get(mdKey);
    let path =
      mapOfLocalizedContent.get(htmlKey) || mapOfLocalizedContent.get(mdKey);
    let hasLocalizedContent = !!path || false;

    if (!path) {
      // make sure there is at least original content path, if localized one is missing
      path = originalFullPath;
    }

    const {
      content: rawContent,
      headings,
      data,
    } = await this.processContentPage(path);

    const { content, data: processedData } = this.postProcessPage(rawContent);

    this.contentPages.set(data.slug, {
      content: hasLocalizedContent ? content : '',
      headings,
      data: {
        ...data,
        ...processedData,
      },
      path: `/${targetLocale}/docs/${data.slug}`,
      section: sectionName,
      originalPath: originalFullPath.split(sourceLocale.toLowerCase())[1],
    });
    process.stdout.write(
      `Processed ${this.contentPages.size} of ${this.estimatedContentPagesAmount} pages\r`
    );
  },

  postProcessPage(rawContent) {
    const { content, data } = runMacros(rawContent);
    return { content, data };
  },

  async processContentPage(path) {
    if (path.slice(-3) === '.md') {
      return await this.processMdPage(path);
    } else {
      return await this.processHtmlPage(path);
    }
  },

  async processMdPage(path) {
    const input = await fs.promises.readFile(path);

    const { data, content: mdContent } = parseFrontMatter(input);

    const linkedContent = await markdownProcessor.process(mdContent); // wrap headings in links

    // TODO: Find a better way, I don't want to parse this thing twice
    const ast = mdHtmlProcessor.parse(linkedContent);
    const headings = findHeadings(ast);

    const { contents: content } = await mdHtmlProcessor.process(linkedContent);

    return {
      content,
      headings,
      data,
    };
  },

  async processHtmlPage(path) {
    const input = await fs.promises.readFile(path);

    const { content: htmlContent, data } = parseFrontMatter(input);

    const linkedContent = await processor.process(htmlContent); // wrap headings in links

    // TODO: Find a better way, I don't want to parse this thing twice
    const ast = processor.parse(linkedContent.contents);
    const headings = findHeadings(ast);
    const content = processor.stringify(ast);

    return {
      content,
      headings,
      data,
    };
  },
};

module.exports = {
  registry,
};
