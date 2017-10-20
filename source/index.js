const assert = require("assert");
const fs = require("fs");
const transform = require("./transformer");
const R = require("ramda");

const okOrNotFound = error => !error || (error && error.code === "ENOENT");

// readFileQuiet: string => Promise<[string, string]>
function readFileQuiet(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data = "") => {
      if (okOrNotFound(err)) {
        // fail silently if the file is not found
        resolve([path, data]);
      } else {
        reject(err);
      }
    });
  });
}

// lastHasLength: any[] => boolean
const lastHasLength = R.compose(Boolean, R.length, R.last);

// getConfigFileAndPath: string[] => Promise<string[]>
const getConfigFileAndPath = paths =>
  R.compose(xs => Promise.all(xs), R.map(readFileQuiet))(paths)
    .then(R.filter(lastHasLength))
    .catch(console.log);

const makeNewConfig = R.curry(
  (theme, app) =>
    new Promise((resolve, reject) => {
      const { paths, name, makeTransforms } = app;

      getConfigFileAndPath(paths).then(pathsAndContents => {
        if (!pathsAndContents.length) {
          console.log(`Found no config file for ${name}.`);
          reject();
        } else {
          const [path, content] = R.last(pathsAndContents);
          const newConfig = transform(
            content.split("\n"),
            makeTransforms(theme.colors)
          );
          resolve([path, newConfig.join("\n")]);
        }
      });
    })
);

function writeConfig([path, config]) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, config, "utf8", err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const getThemeName = R.prop("name");

function initialize(apps, themes) {
  assert.ok(Array.isArray(apps), "Config must be an array");
  assert.ok(Array.isArray(themes), "Themes must be an array");

  return function activateTheme(selectedTheme) {
    assert.ok(typeof selectedTheme === "string", "Expected a string");
    const themeConfig = R.find(
      R.compose(R.equals(selectedTheme), getThemeName),
      themes
    );

    return Promise.all(R.map(makeNewConfig(themeConfig), apps))
      .then(R.map(writeConfig))
      .then(xs => Promise.all(xs))
      .then(() => console.log("done"))
      .catch(console.log);
  };
}

module.exports = {
  initialize,
  getConfigFileAndPath
};
