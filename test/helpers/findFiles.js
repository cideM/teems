import * as find from "find";

const findFiles = async dirPath =>
  new Promise(resolve => {
    find.file(dirPath, files => {
      resolve(files);
    });
  });

module.exports = findFiles;
