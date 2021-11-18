const refSections = require('./section-ref');
const quickLinksSections = require('./section-quick-links');
const refTitleLinks = require('./section-ref-title-links');
const generalLinks = require('./section-general');

function jsSidebarMacro() {
  const context = this;

  // TODO: we definitely need it typed at some point
  return [
    {
      links: generalLinks(context),
      sections: quickLinksSections(context),
    },
    {
      links: refTitleLinks(context),
      sections: refSections(context),
    },
  ];
}

module.exports.default = jsSidebarMacro;
