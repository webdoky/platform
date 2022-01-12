const remarkAutolinkHeadings = require('remark-autolink-headings');
const rehypePrism = require('@mapbox/rehype-prism');
const unified = require('unified');
const remarkRehype = require('remark-rehype');
const rehypeRaw = require('rehype-raw');
const rehypeParse = require('rehype-parse');
const rehypeStringify = require('rehype-stringify');
const link = require('rehype-autolink-headings');
const remarkParse = require('remark-parse');
const remarkExternalLinks = require('remark-external-links');
const {
  markdown: { isDefinitionList, asDefinitionList },
} = require('@webdoky/yari-ports');
const defaultListHandler = require('mdast-util-to-hast/lib/handlers/list');

const externalLinks = require('./utils/plugins/external-links');
const mdSlugify = require('./utils/plugins/md-slugify');

const htmlParseAndProcess = unified()
  .use(rehypeParse, { fragment: true })
  .use(link) // Wrap headings in links, so they became inteactive
  .use(externalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
  });

const mdParseAndProcess = unified()
  .use(remarkParse)
  .use([
    mdSlugify,
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
  ]);

const mdToRehype = unified()
  .use(remarkRehype, {
    handlers: {
      list(h, node) {
        if (isDefinitionList(node)) {
          return asDefinitionList(h, node);
        }

        return defaultListHandler(h, node);
      },
    },
    allowDangerousHtml: true,
  })
  .use(rehypeRaw);

const htmlProcess = unified()
  .use(rehypePrism) // Syntax highlighting in code blocks
  .use(rehypeStringify);

module.exports = {
  mdParseAndProcess,
  htmlParseAndProcess,
  mdToRehype,
  htmlProcess,
};
