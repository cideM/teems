const assert = require("assert");
const fs = require("fs");
const path = require("path");
const transform = require("./transformer");
const R = require("ramda");
const cpr = require("cpr");

const makeNewConfig = (theme, makeTransforms, oldConfig) => {
  const configLines = oldConfig.split("\n");
  return transform(configLines, makeTransforms(theme.mods)).join("\n");
};

function backup(backupPath, filePath, identifier) {
  return new Promise((resolve, reject) => {
    const fileName = R.last(filePath.split("/"));

    cpr(
      filePath,
      path.join(backupPath, `${fileName}.${identifier}`),
      {
        overwrite: true
      },
      (err, files) => {
        if (err && err.code !== "ENOENT" && err.code !== "EEXIST") {
          reject(err);
        }
        resolve(files);
      }
    );
  });
}

function initialize(apps) {
  assert.ok(Array.isArray(apps), "Apps must be an array");

  return function activateTheme(selectedTheme, themes, backupPath) {
    assert.ok(Array.isArray(themes), "Themes must be an array");
    assert.ok(typeof backupPath === "string", "backupPath must be a string");
    assert.ok(typeof selectedTheme === "string", "Expected a string");

    const theme = themes.find(theme1 => theme1.name === selectedTheme);

    if (!theme) {
      throw new Error(`Couldn't find theme ${selectedTheme}`);
    }

    return apps.map(
      (app, i) =>
        new Promise(async (resolve, reject) => {
          const validPaths = app.paths.filter(filePath =>
            fs.existsSync(filePath)
          );

          if (!validPaths.length) {
            reject(new Error(`No config file found for ${app}`));
          }

          await Promise.all(
            validPaths.map((filePath, ii) =>
              backup(backupPath, filePath, `${i}.${ii}`)
            )
          );

          const newConfigsAndPaths = validPaths
            .map(filePath => [fs.readFileSync(filePath, "utf8"), filePath])
            .map(([config, filePath]) => [
              makeNewConfig(theme, app.makeTransforms, config),
              filePath
            ]);

          newConfigsAndPaths.forEach(([newConfig, filePath]) =>
            fs.writeFileSync(filePath, newConfig, "utf8")
          );

          const onlyPaths = newConfigsAndPaths.map(tuple => tuple[0]);

          resolve(Object.assign({}, app, { paths: onlyPaths }));
        })
    );
  };
}

module.exports = {
  initialize
};
