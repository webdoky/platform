const visit = require('unist-util-visit')

// TODO either use it or remove after we've refactored our parsers
module.exports = ast => {
  const headings = []

  visit(ast, 'heading', node => {
    const heading = { depth: node.depth, value: '', anchor: '' }
    const children = node.children || []

    for (let i = 0, l = children.length; i < l; i++) {
      const el = children[i]

      if (el.type === 'link') {
        heading.anchor = el.url
      } else if (el.value) {
        heading.value += el.value
      }
    }

    headings.push(heading)
  })

  return headings
}
