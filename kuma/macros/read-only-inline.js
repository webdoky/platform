const str = 'Тільки для читання ';
const title = 'Це значення змінити не можна.';

module.exports.default = () =>
  `<span title="${title}" class="badge inline readonly">${str}</span>`;
