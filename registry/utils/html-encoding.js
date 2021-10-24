const charsToHtmlEnttitiesMap = {
  '&': '&#x26;',
  '"': '&quot;',
  "'": '&#x27;',
};

const htmlToCharsMap = Object.fromEntries(
  Object.entries(charsToHtmlEnttitiesMap).map((values) => values.reverse())
);

module.exports = {
  unescape: (str) => {
    let res = str;

    Object.keys(htmlToCharsMap).forEach((htmlEntity) => {
      res = res.replace(htmlEntity, htmlToCharsMap[htmlEntity]);
    });

    return res;
  },
};
