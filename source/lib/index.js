const assert = require("assert");
const fs = require("fs");
const path = require("path");
const transform = require("./transformer");
const cpr = require("cpr");

const makeNewConfig = (theme, makeTransforms, oldConfig) => {
  const configLines = oldConfig.split("\n");
  return transform(configLines, makeTransforms(theme.mods)).join("\n");
};

const last = xs => xs.slice(-1)[0];

function backup(backupPath, filePath, identifier) {
  return new Promise((resolve, reject) => {
    const fileName = last(filePath.split("/"));

    cpr(
      filePath,
      path.join(backupPath, `${identifier}-${fileName}`),
      { overwrite: true },
      (err, files) => {
        if (err && err.code !== "ENOENT") {
          reject(err);
        }
        resolve(files);
      }
    );
  });
}

function checkTheme(theme) {
  assert.ok(theme.mods, `Theme ${theme.name} has no property "mods"`);
  assert.ok(
    theme.mods.colors,
    `Theme ${theme.name} has no property "colors" in "mods"`
  );
}

function run(apps, themes, selectedTheme, backupPath) {
  assert.ok(Array.isArray(apps), "Apps must be an array");
  assert.ok(Array.isArray(themes), "Themes must be an array");
  themes.forEach(checkTheme);
  assert.ok(typeof backupPath === "string", "backupPath must be a string");
  assert.ok(typeof selectedTheme === "string", "Expected a string");

  const theme = themes.find(theme1 => theme1.name === selectedTheme);

  if (!theme) {
    throw new Error(`Couldn't find theme ${selectedTheme}`);
  }

  return apps.map(
    app =>
      new Promise(async (resolve, reject) => {
        const validPaths = app.paths.filter(fs.existsSync);

        if (!validPaths.length) {
          reject(new Error(`No config file found for ${app}`));
        }

        await Promise.all(
          validPaths.map((filePath, ii) =>
            backup(backupPath, filePath, `${app.name}-${ii}`)
          )
        );

        const newConfigsAndPaths = validPaths.map(filePath => {
          const oldConfig = fs.readFileSync(filePath, "utf8");
          const newConfig = makeNewConfig(theme, app.makeTransforms, oldConfig);
          return [newConfig, filePath];
        });

        newConfigsAndPaths.forEach(([newConfig, filePath]) =>
          fs.writeFileSync(filePath, newConfig, "utf8")
        );

        resolve([app.name, validPaths]);
      })
  );
}

module.exports = run;
