'use-strict'
const assert = require('assert')
const fs = require('fs')
const transform = require('./transformer')

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

// TODO: just call app.transform(theme) and let the app handle everything
function makeNewConfig(theme, makeTransforms, oldConfig) {
    const configLines = oldConfig.split('\n')
    const transforms = makeTransforms({ colors: theme.colors })

    return transform(configLines, transforms).join('\n')
}

function checkTheme(theme) {
    assert.ok(theme.colors, `Theme ${theme.name} has no property "colors"`)

    const { colors } = theme

    MANDATORY_COLORS.forEach(x => {
        if (!Object.keys(colors).includes(x)) {
            throw new Error(`Color ${x} is missing in theme ${theme.name}`)
        } else if (!VALID_COLOR_REGEXP.test(colors[x])) {
            throw new Error(
                `Color ${colors[x]} is not a valid color, in theme ${
                    theme.name
                }. Accepted values are #XXX and #XXXXXX`
            )
        }
    })
}

function run(apps, themes, selectedTheme) {
    assert.ok(Array.isArray(apps), 'Apps must be an array')
    assert.ok(Array.isArray(themes), 'Themes must be an array')

    themes.forEach(checkTheme)

    assert.ok(typeof selectedTheme === 'string', 'Expected a string')

    const themeToActivate = themes.find(theme => theme.name === selectedTheme)

    if (!themeToActivate) {
        throw new Error(`Couldn't find theme ${selectedTheme}`)
    }

    return apps.map(
        app =>
            new Promise(async (resolve, reject) => {
                const validPaths = app.paths.filter(fs.existsSync)

                if (!validPaths.length) {
                    const error = new Error(`No config file found for ${app.name}`)
                    error.appName = app.name
                    reject(error)
                }

                for (const path in validPaths) {
                    const newConfig = makeNewConfig(
                        themeToActivate,
                        app.makeTransforms,
                        fs.readFileSync(path, 'utf8')
                    )

                    try {
                        fs.writeFileSync(path, newConfig, 'utf8')
                    } catch (e) {
                        reject(e)
                    }

                    resolve({ appName: app.name })
                }
            })
    )
}

module.exports = run
