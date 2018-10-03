const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')

const makeSelector = word => new RegExp(`^\\s.(${word}):(\\s*)'[a-zA-Z0-9]*'`)

const transformColor = color => color.replace(/#/, '0x')

// colors.foreground
// colors.background
// colors.foreground
// colors.foreground
// colors.color0
// colors.color1
// colors.color2
// colors.color3
// colors.color4
// colors.color5
// colors.color6
// colors.color7
// colors.color8
// colors.color9
// colors.color10
// colors.color11
// colors.color12
// colors.color13
// colors.color14
// colors.color15

let BRIGHT_COLORS = false
const re = /^s\s*.(foreground|background|black|red|green|yellow|blue|magenta|cyan|white):\s*'0x(\w{6})'/

const transform = colors => line => {
    const result = re.exec(line)

    if (result) {
        const [_, color, value] = result
    }
}

const configName = 'alacritty.yml'

const alacritty = {
    name: 'alacritty',
    paths: [
        path.join(xdgBase.config, 'alacritty', configName),
        path.join(xdgBase.config, configName),
        path.join(os.homedir(), configName),
    ],
    transformFn: transform,
}

module.exports = makeTransforms
