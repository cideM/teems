const fs = require('fs')
const perLine = require('../perLine')
const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')
const { getColor } = require('./termite')

const COLOR_LINE_REGEXP = /^(\s*)\*\.(foreground|background|color\d{1,2})([\s:]*)#\w{6}(.*)/

const configName = '.Xresources'
const paths = [path.join(xdgBase.config, configName), path.join(os.homedir(), configName)]

const transform = colors => l => {
    const match = COLOR_LINE_REGEXP.exec(l)

    if (match) {
        // eslint-disable-next-line
        const [_, whitespace, color, stuff, trailing] = match

        const newValue = getColor(colors, color)

        return `${whitespace}*.${color}${stuff}${newValue}${trailing}`
    } else return l
}

const run = (colors, { dry }) => {
    const _transform = transform(colors)

    return paths.filter(fs.existsSync).map(p => perLine(p, dry, _transform))
}

const app = {
    name: 'Xresources',
    run,
}

module.exports = {
    COLOR_LINE_REGEXP,
    getColor,
    transform,
    app,
}
