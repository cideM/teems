const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const { COPYFILE_EXCL } = fs.constants;

const CONFIG_PATH = path.join(__dirname, "..", "..", "config.json");

/**
 * Serializes an object into a json file
 * @param {Object} dataObj
 * @param {string} [ownConfig = CONFIG_PATH]
 */
function writeConfig(dataObj, ownConfig = CONFIG_PATH) {
  try {
    fs.writeFileSync(ownConfig, JSON.stringify(dataObj));
  } catch (err) {
    throw err;
  }
}

/**
 * @typedef Config
 * @prop {string} appDir
 * @prop {string} backupDir
 */

/**
 * Reads and parses a JSON file
 * @param {string} [ownConfig = CONFIG_PATH]
 * @returns {Config}
 */
function getConfig(ownConfig = CONFIG_PATH) {
  try {
    return JSON.parse(fs.readFileSync(ownConfig));
  } catch (err) {
    throw err;
  }
}

/**
 * Creates a teems folder and then a backup folder within that teems folder.
 * Also stores the path to both folders in its own config file, in the module dir
 * @param {string} basePath - directory where teems will creates its own config folder
 * @param {string} [appDirName = 'teems'] - name of the teems config folder (where the themes are as well)
 * @returns {void}
 */
function postInstall(
  basePath,
  appDirName = "teems",
  ownConfigPath = CONFIG_PATH
) {
  const appDir = path.join(basePath, appDirName);
  const backupDir = path.join(appDir, "backup");

  // Config folder
  mkdirp.sync(appDir);
  console.log(`Created folder ${appDir}`);

  // Backup folder
  mkdirp.sync(backupDir);
  console.log(`Created backup folder ${backupDir}`);

  // Copy example themes
  try {
    fs.copyFileSync(
      path.join(__dirname, "themes.json"),
      path.join(appDir, "themes.json"),
      COPYFILE_EXCL
    );
    console.log(`Copied example themes.json to ${appDir}`);
  } catch (err) {
    // Do nothing if the file already exists
  }

  writeConfig(
    {
      appDir,
      backupDir
    },
    ownConfigPath
  );
  console.log(`Stored own configuration in ${ownConfigPath}`);
}

/**
 * Returns the themes array
 * @param {string} [ownConfig=CONFIG_PATH]
 * @returns {Array<Object>}
 */
function getThemes(ownConfig = CONFIG_PATH) {
  try {
    const { appDir } = getConfig(ownConfig);
    const themes = require(path.join(appDir, "themes.json")); // eslint-disable-line
    return themes;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  postInstall,
  writeConfig,
  getConfig,
  getThemes
};
