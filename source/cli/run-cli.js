#!/usr/bin/env node
// TODO: Commander!

const fs = require('fs')
const { app: alacritty } = require('../lib/apps/alacritty')
const { app: termite } = require('../lib/apps/termite')
const meow = require('meow')
const checkTheme = require('../lib/checkTheme')
const listThemes = require('../lib/listThemes')

const apps = [alacritty, termite]

const cli = meow(
    `
    Usage
        $ teems-cli [pathToConfig] <themeName>

        Path to config is a required argument and should point at a .json file containing themes.
        One is created automatically in your OS configuration folder, as "themes.json".

        When called without a theme name, it just lists the available themes.

    Options
        -d, --dry Print modified config files without writing to disk

    Help
        Hit me up on twitter @AyanamiVey or write an issue on https://github.com/cideM/teems-cli
`,
    {
        flags: {
            dry: {
                type: 'boolean',
                alias: 'd',
            },
        },
    }
)

const main = (configPath, themeName, flags) => {
    let themes

    try {
        themes = JSON.parse(fs.readFileSync(configPath))
    } catch (e) {
        throw new Error(`Could not read file ${configPath}`)
    }

    // Throws error on invalid theme
    themes.forEach(checkTheme)

    if (themeName) {
        const theme = themes.find(t => t.name === themeName)

        if (!theme) throw new Error(`No theme with name ${themeName} found in ${configPath}`)

        apps.forEach(a => {
            process.stdout.write(`Running transforms for ${a.name}...\n`)

            const ps = a.run(theme.colors, { dry: Boolean(flags.dry) })

            ps.forEach(p => {
                p
                    .then(fpath => process.stdout.write(`\u2705 Changed colors in ${fpath}\n`))
                    .catch(e => `${process.stderr.write(`\u274C Error for ${fpath}:\n ${e})}\n`)
            })
        })
    } else listThemes(themes)
}

const { flags, input } = cli

const [pathToConfig, themeName] = input

if (!pathToConfig) {
    // eslint-disable-next-line
    console.log('Please provide path to config file!')
} else main(pathToConfig, themeName, flags)
