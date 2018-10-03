const assert = require('assert')

const MANDATORY_COLORS = [
    'foreground',
    'background',
    'color0',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
    'color13',
    'color14',
    'color15',
]

const VALID_COLOR_REGEXP = /#[0-9a-fA-F]{3}$|#[0-9a-fA-F]{6}$/

function checkTheme(theme) {
    assert.ok(theme.colors, `Theme ${theme.name} has no property "colors" in "mods"`)

    const { colors } = theme
    const colorNames = Object.keys(colors)

    MANDATORY_COLORS.forEach(c => {
        if (!colorNames.includes(c)) {
            throw new Error(`Color ${c} is missing in theme ${theme.name}`)
        } else if (!VALID_COLOR_REGEXP.test(colors[c])) {
            throw new Error(
                `Color ${colors[c]} is not a valid color, in theme ${
                    theme.name
                }. Accepted values are #XXX and #XXXXXX`
            )
        }
    })
}

module.exports = checkTheme
