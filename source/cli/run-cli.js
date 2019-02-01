#!/usr/bin/env node

const fs = require('fs')
const meow = require('meow')
const listApps = require('../lib/listApps')
const activateTheme = require('../lib/activateTheme')
const readTheme = require('../lib/readTheme')
const listThemes = require('../lib/listThemes')

const cli = meow(
    `
    Usage
        $ teems-cli [pathToConfig] <themeName>

        Called with two arguments:
            Activate <themeName> found in [pathToConfig]
        Called with one argument
            List themes in [pathToConfig]
        Called with no arguments
            List supported apps

        An example themes.json is created automatically in your OS configuration folder.

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
    if (!configPath) {
        return listApps()
    }

    let themes

    try {
        themes = JSON.parse(fs.readFileSync(configPath))
    } catch (e) {
        throw new Error(`Could not read file ${configPath}`)
    }

    if (themeName) {
        const theme = themes.find(t => t.name === themeName)

        if (!theme) throw new Error(`No theme with name ${themeName} found in ${configPath}`)

        activateTheme(readTheme(theme), flags.dry)
    } else listThemes(themes)
}

const { flags, input } = cli

const [pathToConfig, themeName] = input

main(pathToConfig, themeName, flags)
