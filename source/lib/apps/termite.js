const path = require('path')
const transform = require('../transform.js')
const os = require('os')
const xdgBase = require('xdg-basedir')

const lineMatchRegExp = /^(\s*)(foreground|foreground_bold|cursor|cursor_foreground|highlight|background|color\d{1,2})([\s=]*)#\w{6}(.*)/

const configName = 'config'
const paths = [
    path.join(xdgBase.config, 'termite', configName),
    path.join(xdgBase.config, configName),
    path.join(os.homedir(), configName),
]

const shouldTransformLine = line => lineMatchRegExp.test(line)

const newLineRegExp = /^(.*=\s*)(#\w{6}|rgba\(.*\))(.*)/

const getNewLine = (line, newColorValue) => {
    const matches = newLineRegExp.exec(line).slice(1)

    return matches[0] + newColorValue + matches[2]
}

const getColorName = line => lineMatchRegExp.exec(line).slice(1)[1]

const run = transform(shouldTransformLine, getColorName, getNewLine)
module.exports = {
    run, paths
}
