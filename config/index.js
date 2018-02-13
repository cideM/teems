const path = require('path')
const xdg = require('xdg-basedir')

const rootPath = path.join(__dirname, '..')
const cliPath = path.join(rootPath, 'source/cli')
const libPath = path.join(rootPath, 'source/lib')
const configFilePath = path.join(rootPath, 'config.json')
const appDir = path.join(xdg.config, 'teems')
const backupDir = path.join(xdg.config, 'teems/backup')

module.exports = {
    rootPath,
    cliPath,
    libPath,
    configFilePath,
    appDir,
    backupDir,
}
