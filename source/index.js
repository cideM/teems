const assert = require("assert");
const fs = require("fs");
const transform = require("./transformer");
const R = require("ramda");
const nodepath = require("path");
const util = require("util");
const cp = require("recursive-copy");

const okOrNotFound = error => !error || (error && error.code === "ENOENT");

const readFileQuiet = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data = "") => {
      if (okOrNotFound(err)) {
        // fail silently if the file is not found
        resolve({ path, data });
      } else {
        reject(err);
      }
    });
  });

const tryAllPaths = R.compose(R.map(readFileQuiet), R.prop("paths"));
const objectWithData = R.compose(Boolean, R.prop("data"));

const addConfigAndPathToAppObject = app =>
  Promise.all(tryAllPaths(app))
    .then(
      R.either(R.find(objectWithData), () => {
        throw new Error(`No config file found for ${app.name}`);
      })
    )
    .then(R.merge(app));

const makeNewConfig = R.curry(
  (theme, app) =>
    new Promise(resolve => {
      const { data, makeTransforms } = app;
      const newConfig = transform(
        data.split("\n"),
        makeTransforms(theme.colors)
      );
      resolve(R.merge(app, { config: newConfig.join("\n") }));
    })
);

const writeConfig = app => {
  const { path, config } = app;

  return util.promisify(fs.writeFile)(path, config, "utf8").then(file =>
    R.merge(app, { data: file })
  );
};

const getThemeName = R.prop("name");

const appendBackup = path => `backup/${path}`;

const backupFile = backupPath => filePath =>
  cp(filePath, nodepath.resolve(backupPath, appendBackup(filePath)), {
    overwrite: true,
    expand: true,
    dot: true
  });

function initialize(apps, themes, backupPath) {
  assert.ok(Array.isArray(apps), "Apps must be an array");
  assert.ok(Array.isArray(themes), "Themes must be an array");
  assert.ok(typeof backupPath === "string", "backupPath must be a string");

  return function activateTheme(selectedTheme) {
    assert.ok(typeof selectedTheme === "string", "Expected a string");
    const theme = R.find(
      R.compose(R.equals(selectedTheme), getThemeName),
      themes
    );

    const run = R.composeP(
      writeConfig,
      makeNewConfig(theme),
      addConfigAndPathToAppObject
    );

    R.forEach(app => {
      R.compose(R.forEach(backupFile(backupPath)), R.prop("paths"))(app);
    }, apps);

    return R.map(
      app =>
        run(app)
          .then(app2 => {
            console.log(
              `\u{2698} Changed config for ${app2.name} at ${app2.path}`
            );
            return app2;
          })
          .catch(console.log),
      apps
    );
  };
}

module.exports = {
  initialize,
  addConfigAndPathToAppObject,
  readFileQuiet
};
