const assert = require("assert");
const fs = require("mz/fs");
const transform = require("./transformer");

function readFileQuiet(path) {
  try {
    const content = fs.readFileSync(path, { encoding: "utf8" });
    return content;
  } catch (error) {
    return null;
  }
}

function getConfigFileAndPath(paths) {
  const filesWithPaths = paths
    .map(path => [path, readFileQuiet(path)])
    .filter(pathAndContent => Boolean(pathAndContent[1]));
  return filesWithPaths.length ? filesWithPaths[filesWithPaths.length - 1] : [];
}

function makeNewConfig(app, theme) {
  return new Promise((resolve, reject) => {
    const { paths, name, makeTransforms } = app;
    const configFileAndPath = getConfigFileAndPath(paths);

    if (!configFileAndPath.length) {
      console.log(`Found no config file for ${name}.`);
      reject();
    } else {
      const [path, content] = configFileAndPath;
      const newConfig = transform(
        content.split("\n"),
        makeTransforms(theme.colors)
      );
      resolve([path, newConfig.join("\n")]);
    }
  });
}

function writeConfigs(pathsAndConfigs) {
  return pathsAndConfigs.map(([path, config]) =>
    fs.writeFile(path, config, { encoding: "utf8" })
  );
}

function main(apps, themes) {
  assert.ok(Array.isArray(apps), "Config must be an array");
  assert.ok(Array.isArray(themes), "Themes must be an array");

  return function activateTheme(selectedTheme) {
    assert.ok(typeof selectedTheme === "string", "Expected a string");
    const themeConfig = themes.find(theme => theme.name === selectedTheme);

    return Promise.all(apps.map(app => makeNewConfig(app, themeConfig)))
      .then(pathsAndConfigs => Promise.all(writeConfigs(pathsAndConfigs)))
      .catch(console.log);
  };
}

module.exports = {
  main,
  getConfigFileAndPath
};
