const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')
const transform = require('../transform')

const lineMatchRegExp = /^(\s*)(cursor|text|foreground|background|black|red|green|yellow|blue|magenta|cyan|white):(\s*)'0x(\w{6})'(.*)/

const shouldTransformLine = line => lineMatchRegExp.test(line)

// Return the color name for the theme, **not** the name in the
// configuration file
const getColorName = (line, state) => {
    const { isBright } = state
    const matches = lineMatchRegExp.exec(line)
    const matchedName = matches[2]

    const map = {
        text: 'text',
        cursor: 'cursor',
        foreground: 'foreground',
        background: 'background',
        black: isBright ? 'color8' : 'color0',
        red: isBright ? 'color9' : 'color1',
        green: isBright ? 'color10' : 'color2',
        yellow: isBright ? 'color11' : 'color3',
        blue: isBright ? 'color12' : 'color4',
        magenta: isBright ? 'color13' : 'color5',
        cyan: isBright ? 'color14' : 'color6',
        white: isBright ? 'color15' : 'color7',
    }

    return map[matchedName]
}

const newLineRegExp = /(.*'0x)(\w{6})('.*)/

const getNewLine = (line, newColorValue) => {
    const matches = newLineRegExp.exec(line).slice(1)

    // Omit the old color value, which is capture group 2 (~ index 1)
    return matches[0] + newColorValue + matches[2]
}

const isBrightColorBlock = /^\s*bright:\s*$/

const getNewState = (line, oldState) => ({
    isBright: isBrightColorBlock.test(line) || oldState.isBright,
})

const configName = 'alacritty.yml'

const paths = [
    path.join(xdgBase.config, 'alacritty', configName),
    path.join(xdgBase.config, configName),
    path.join(os.homedir(), configName),
]

const run = transform(shouldTransformLine, getColorName, getNewLine, getNewState, {
    isBright: false,
})

module.exports = { run, paths }
