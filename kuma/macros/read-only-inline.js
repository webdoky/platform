const str = 'Тільки для читання ';
const title = 'Це значення змінити не можна.';

function readOnlyInline() {
  return `<span title="${title}" class="badge inline readonly">${str}</span>`;
}

module.exports.default = readOnlyInline;
