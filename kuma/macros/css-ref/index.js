const labels = require('./labels');
const learningSections = require('./section-learning');
const refSections = require('./section-ref');
const guidesSections = require('./section-guides');

function cssRefMacro() {
  const context = this;

  // TODO: we definitely need it typed at some point
  return [
    {
      title: labels['Learn_CSS'],
      sections: learningSections(context),
    },
    {
      title: labels['Reference'],
      sections: refSections(context),
    },
    {
      title: labels['Guides'],
      sections: guidesSections(context),
    },
  ];
}

module.exports.default = cssRefMacro;
