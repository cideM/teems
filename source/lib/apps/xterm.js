const transform = require('../transform')
const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')

const lineMatchRegExp = /^(\s*)XTerm\*(foreground|background|color\d{1,2})([\s:]*)#\w{6}(.*)/i

const configName = '.Xresources'
const paths = [path.join(xdgBase.config, configName), path.join(os.homedir(), configName)]

const shouldTransformLine = line => lineMatchRegExp.test(line)

const newLineRegExp = /^(.*)(#\w{6})(.*)/i

const getNewLine = (line, newColorValue) => {
    const matches = newLineRegExp.exec(line).slice(1)

    return matches[0] + newColorValue + matches[2]
}

const getColorName = line => lineMatchRegExp.exec(line).slice(1)[1]

const run = transform(shouldTransformLine, getColorName, getNewLine)

module.exports = {
    run,
    paths,
}
