const path = require('path')

const rootPath = path.join(__dirname, '..')
const testPath = path.join(rootPath, 'test')
const cliPath = path.join(rootPath, 'source', 'cli')
const libPath = path.join(rootPath, 'source', 'lib')
const configFilePath = path.join(rootPath, 'config.json')

module.exports = {
    rootPath,
    testPath,
    cliPath,
    libPath,
    configFilePath,
}
