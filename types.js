const graphqlSchemaTypes = `
type PageHeadings {
  depth: Int
  value: String
  anchor: String
}
type PageMacro {
  macro: String
  result: String
}
type MdnPage implements Node {
  id: ID!
  title: String
  slug: String
  tags: [String]
  macros: [PageMacro]
  content: String
  hasContent: Boolean
  headings: [PageHeadings]
  path: String
  originalPath: String
  updatesInOriginalRepo: [String]
  section: String
  sourceLastUpdatetAt: Int
  translationLastUpdatedAt: Int
  browser_compat: String
}
`;

module.exports = graphqlSchemaTypes;
