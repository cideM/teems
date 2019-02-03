const path = require('path')
const { ColorNotFoundError } = require('../../errorTypes.js')
const { rgbToHex } = require('../shared.js')

const lineMatchRegExp = /^\s*(cursor|text|foreground|background|black|red|green|yellow|blue|magenta|cyan|white):\s*['"]0x(\w{6})['"].*/

// Return the color name for the theme, **not** the name in the
// configuration file
const getThemeColorName = name => {
    const map = {
        text: ['text', 'text'],
        cursor: ['cursor', 'cursor'],
        foreground: ['foreground', 'foreground'],
        background: ['background', 'background'],
        black: ['color0', 'color8'],
        red: ['color1', 'color9'],
        green: ['color2', 'color10'],
        yellow: ['color3', 'color11'],
        blue: ['color4', 'color12'],
        magenta: ['color5', 'color13'],
        cyan: ['color6', 'color14'],
        white: ['color7', 'color15'],
    }

    return map[name]
}

const configName = 'alacritty.yml'

const paths = [path.join('alacritty', configName), configName]

const run = (colors, input) => {
    const lines = input.split('\n')

    const { newLines } = lines.reduce(
        (acc, line) => {
            const { newLines, mode } = acc
            const trimmed = line.trim()

            if (trimmed === 'bright:') return { mode: 'bright', newLines: newLines.concat(line) }
            if (trimmed === 'normal:') return { mode: 'normal', newLines: newLines.concat(line) }

            const matches = lineMatchRegExp.exec(line)

            if (matches) {
                const [colorName, value] = matches.slice(1)
                const themeColorName = getThemeColorName(colorName)[mode === 'bright' ? 1 : 0]

                const newColorValue = colors[themeColorName]

                if (!newColorValue) throw new ColorNotFoundError(themeColorName)

                const replaced = line.replace(value, rgbToHex(newColorValue).slice(1))

                return { mode, newLines: newLines.concat(replaced) }
            } else {
                return { mode, newLines: newLines.concat(line) }
            }
        },
        { mode: 'normal', newLines: [] }
    )

    return newLines.join('\n')
}

const app = {
    name: 'alacritty',
    run,
    paths,
}

module.exports = { app, run, paths }
