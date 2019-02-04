const fs = require('fs')
const path = require('path')
const xdgBase = require('xdg-basedir')

const { COPYFILE_EXCL } = fs.constants

const targetPath = path.join(xdgBase.config, 'themes.json')

function postInstall() {
    // Copy example themes file
    try {
        fs.copyFileSync(
            path.join(__dirname, 'themes.json'),
            targetPath,
            COPYFILE_EXCL // dont overwrite
        )
    } catch (e) {
        if (e.code !== 'EEXIST') throw e
    }

    console.log(`Copied example themes.json to ${targetPath}`)
}

module.exports = postInstall
