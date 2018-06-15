'use-strict'
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const transform = require('./transformer')
const cpr = require('cpr')

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

function makeNewConfig(theme, makeTransforms, oldConfig) {
    const configLines = oldConfig.split('\n')
    return transform(configLines, makeTransforms({ colors: theme.colors })).join('\n')
}

function last(xs) {
    return xs.slice(-1)[0]
}

function backup(backupPath, filePath, identifier) {
    return new Promise((resolve, reject) => {
        const fileName = last(filePath.split('/'))

        cpr(
            filePath,
            path.join(backupPath, `${identifier}-${fileName}`),
            { overwrite: true },
            (err, files) => {
                if (err && err.code !== 'ENOENT') {
                    reject(err)
                }
                resolve(files)
            }
        )
    })
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

function run(apps, themes, selectedTheme, backupPath) {
    assert.ok(Array.isArray(apps), 'Apps must be an array')
    assert.ok(Array.isArray(themes), 'Themes must be an array')

    themes.forEach(checkTheme)

    assert.ok(typeof backupPath === 'string', 'backupPath must be a string')
    assert.ok(typeof selectedTheme === 'string', 'Expected a string')

    const theme = themes.find(theme1 => theme1.name === selectedTheme)

    if (!theme) {
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

                await Promise.all(
                    validPaths.map((filePath, ii) =>
                        backup(backupPath, filePath, `${app.name}-${ii}`)
                    )
                )

                try {
                    const newConfigsAndPaths = validPaths.map(filePath => {
                        const oldConfig = fs.readFileSync(filePath, 'utf8')
                        const newConfig = makeNewConfig(theme, app.makeTransforms, oldConfig)
                        return [newConfig, filePath]
                    })

                    newConfigsAndPaths.forEach(([newConfig, filePath]) =>
                        fs.writeFileSync(filePath, newConfig, 'utf8')
                    )
                    resolve([app.name, validPaths])
                } catch (error) {
                    error.appName = app.name
                    reject(error)
                }
            })
    )
}

module.exports = run
