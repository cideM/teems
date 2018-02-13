const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const config = require('../../config/index')

const { COPYFILE_EXCL } = fs.constants

/**
 * Creates a teems folder and then a backup folder within that teems folder.
 * Also stores the path to both folders in its own config file, in the module dir
 */
function postInstall() {
    // Config folder
    mkdirp.sync(config.appDir)
    console.log(`Created folder ${config.appDir}`)

    // Backup folder
    mkdirp.sync(config.backupDir)
    console.log(`Created backup folder ${config.backupDir}`)

    // Copy example themes
    try {
        fs.copyFileSync(
            path.join(__dirname, 'themes.json'),
            path.join(config.appDir, 'themes.json'),
            COPYFILE_EXCL // dont overwrite
        )
        console.log(`Copied example themes.json to ${config.appDir}`)
    } catch (err) {
        // Do nothing if the file already exists
    }
}

module.exports = postInstall
