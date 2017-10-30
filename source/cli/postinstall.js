const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const { configFilePath } = require("../../config/index");

const { COPYFILE_EXCL } = fs.constants;

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
  ownConfigPath = configFilePath
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

  fs.writeFileSync(ownConfigPath, JSON.stringify({ appDir, backupDir }));
  console.log(`Stored own configuration in ${ownConfigPath}`);
}

module.exports = postInstall;
