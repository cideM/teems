const cp = require("recursive-copy");
const path = require("path");

const options = {
  overwrite: true
};

const restoreFiles = () =>
  cp(
    path.join(__dirname, "../config/backup/"),
    path.join(__dirname, "../config/tested/"),
    options
  );

module.exports = restoreFiles;
