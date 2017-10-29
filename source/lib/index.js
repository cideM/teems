const assert = require("assert");
const fs = require("fs");
const path = require("path");
const transform = require("./transformer");
const R = require("ramda");
const util = require("util");

const { COPYFILE_EXCL } = fs.constants;

const okOrNotFound = error => !error || (error && error.code === "ENOENT");

const readFileQuiet = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf8" }, (err, data = "") => {
      if (okOrNotFound(err)) {
        // fail silently if the file is not found
        resolve({ filePath, configFile: data });
      } else {
        reject(err);
      }
    });
  });

const tryAllPaths = R.compose(R.map(readFileQuiet), R.prop("paths"));
const objectWithConfig = R.compose(Boolean, R.prop("configFile"));

const addConfigAndPathToAppObject = app =>
  Promise.all(tryAllPaths(app))
    .then(
      R.either(R.find(objectWithConfig), () => {
        throw new Error(`No config file found for ${app.name}`);
      })
    )
    .then(R.merge(app));

const makeNewConfig = R.curry(
  (theme, app) =>
    new Promise(resolve => {
      const { configFile, makeTransforms } = app;
      const configLines = configFile.split("\n");
      const newConfig = transform(configLines, makeTransforms(theme.colors));
      resolve(R.merge(app, { newConfig: newConfig.join("\n") }));
    })
);

const writeConfig = app => {
  const { filePath, newConfig } = app;

  return util.promisify(fs.writeFile)(filePath, newConfig, "utf8").then(() =>
    R.merge(app, { newConfig })
  );
};

const getThemeName = R.prop("name");

function backupApp(backupPath, app, i) {
  const { paths } = app;

  paths.forEach(filePath => {
    const fileName = R.last(filePath.split("/"));

    try {
      fs.copyFileSync(
        filePath,
        path.join(backupPath, `${fileName}.${i}`),
        COPYFILE_EXCL
      );
    } catch (err) {
      if (err && err.code !== "ENOENT") {
        console.log(err);
      }
    }
  });
}

function initialize(apps) {
  assert.ok(Array.isArray(apps), "Apps must be an array");

  return function activateTheme(selectedTheme, themes, backupPath) {
    assert.ok(Array.isArray(themes), "Themes must be an array");
    assert.ok(typeof backupPath === "string", "backupPath must be a string");
    assert.ok(typeof selectedTheme === "string", "Expected a string");

    const theme = R.find(
      R.compose(R.equals(selectedTheme), getThemeName),
      themes
    );

    if (!theme) {
      throw new Error(`Couldn't find theme ${selectedTheme}`);
    }

    // compose promises together to form a single promise
    const run = R.composeP(
      writeConfig,
      makeNewConfig(theme),
      addConfigAndPathToAppObject
    );

    apps.forEach((app, i) => backupApp(backupPath, app, i));

    return R.map(run, apps);
  };
}

module.exports = {
  initialize,
  addConfigAndPathToAppObject,
  readFileQuiet
};
