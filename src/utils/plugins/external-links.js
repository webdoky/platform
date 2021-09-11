const visit = require('unist-util-visit');
const parse = require('space-separated-tokens');
const absolute = require('is-absolute-url');
var extend = require('extend');

const defaultTarget = '_blank';
const defaultRel = ['nofollow', 'noopener', 'noreferrer'];
const defaultProtocols = ['http', 'https'];

/**
 * Plugin to automatically add `target` and `rel` attributes to external links.
 *
 */
function externalLinks(options = {}) {
  const target = options.target;
  const rel =
    typeof options.rel === 'string' ? parse(options.rel) : options.rel;
  const protocols = options.protocols || defaultProtocols;
  const content =
    options.content && !Array.isArray(options.content)
      ? [options.content]
      : options.content;
  const contentProperties = options.contentProperties || {};

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'a' &&
        node.properties &&
        typeof node.properties.href === 'string'
      ) {
        const url = node.properties.href;
        const protocol = url.slice(0, url.indexOf(':'));

        if (absolute(url) && protocols.includes(protocol)) {
          if (target !== false) {
            node.properties.target = target || defaultTarget;
          }

          if (rel !== false) {
            node.properties.rel = (rel || defaultRel).concat();
          }

          if (content) {
            node.children.push({
              type: 'element',
              tagName: 'span',
              properties: extend(true, contentProperties),
              children: extend(true, content),
            });
          }
        }
      }
    });
  };
}

module.exports = externalLinks;
