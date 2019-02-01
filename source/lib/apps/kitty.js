const transform = require('../transform.js')
const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')

const lineMatchRegExp = /^(\s*)(active_border_color|inactive_border_color|active_tab_foreground|active_tab_background|inactive_tab_foreground|inactive_tab_background|background|foreground|selection_foreground|selection_background|color\d{1,2}|url_color|cursor)(\s*)#\w{6}(.*)/

const shouldTransformLine = line => lineMatchRegExp.test(line)

const newLineRegExp = /^(.*)(#\w{6})(.*)/i

const getNewLine = (line, newColorValue) => {
    const matches = newLineRegExp.exec(line).slice(1)

    return matches[0] + newColorValue + matches[2]
}

const getColorName = line => lineMatchRegExp.exec(line).slice(1)[1]

const configName = 'kitty.conf'
const paths = [
    path.join(xdgBase.config, 'kitty', configName),
    path.join(xdgBase.config, configName),
    path.join(os.homedir(), configName),
]

const run = transform(shouldTransformLine, getColorName, getNewLine)

module.exports = {
    run,
    paths,
}
