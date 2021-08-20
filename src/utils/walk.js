const fs = require('fs');
const path = require('path');

const walk = async (dirname) => {
  const list = await fs.promises.readdir(dirname);
  let files = [];

  const operations = list.map(async (fileName) => {
    const resolvedFile = path.resolve(dirname, fileName);
    const fileStat = await fs.promises.stat(resolvedFile);

    if (fileStat && fileStat.isDirectory()) {
      const innerList = await walk(resolvedFile);
      files = files.concat(innerList);
    } else {
      files.push(resolvedFile);
    }
  });

  await Promise.all(operations);

  return files;
};

module.exports = walk;
