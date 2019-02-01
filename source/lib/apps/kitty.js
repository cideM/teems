const fs = require('fs')
const perLine = require('../perLine')
const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')

const COLOR_LINE_REGEXP = /^(\s*)(active_border_color|inactive_border_color|active_tab_foreground|active_tab_background|inactive_tab_foreground|inactive_tab_background|background|foreground|selection_foreground|selection_background|color\d{1,2}|url_color|cursor)(\s*)#\w{6}(.*)/

const configName = 'kitty.conf'
const paths = [
    path.join(xdgBase.config, 'kitty', configName),
    path.join(xdgBase.config, configName),
    path.join(os.homedir(), configName),
]

const transform = colors => l => {
    const match = COLOR_LINE_REGEXP.exec(l)

    if (match) {
        // eslint-disable-next-line
        const [_, whitespace, color, whitespace2] = match

        const newValue = colors[color]

        return `${whitespace}${color}${whitespace2}${newValue}`
    } else return l
}

const run = (colors, { dry }) => {
    const _transform = transform(colors)

    return paths.filter(fs.existsSync).map(p => perLine(p, dry, _transform))
}

const app = {
    name: 'termite',
    run,
}

module.exports = {
    COLOR_LINE_REGEXP,
    transform,
    app,
}
