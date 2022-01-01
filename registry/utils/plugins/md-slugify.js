// Note: the contents of this file is pretty much verbatim of remarkjs/remark-slug
'use strict';

const toString = require('mdast-util-to-string');
const visit = require('unist-util-visit');
const slugs = require('github-slugger')();
const cyrillicToTranslit = require('cyrillic-to-translit-js');

module.exports = mdSlugify;

function mdSlugify() {
  return transformer;
}

/* Patch slugs on heading nodes. */
function transformer(ast) {
  slugs.reset();

  visit(ast, 'heading', function (node) {
    let nodeContent = toString(node);
    if (/[а-яА-ЯіїІЇ]/.test(nodeContent)) {
      nodeContent = cyrillicToTranslit({ preset: 'uk' }).transform(nodeContent);
    }
    const id = slugs.slug(nodeContent);
    const data = patch(node, 'data', {});

    /* Non-html */
    patch(data, 'id', id);
    /* Legacy remark-html */
    patch(data, 'htmlAttributes', {});
    /* Current remark-html */
    patch(data, 'hProperties', {});
    patch(data.htmlAttributes, 'id', id);
    patch(data.hProperties, 'id', id);
  });
}

function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value;
  }

  return context[key];
}
