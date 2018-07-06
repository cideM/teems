#!/usr/bin/env node

'use-strict'

const meow = require('meow')
const fs = require('fs')
const run = require('../lib/index')
const apps = require('../lib/apps/index')

const cli = meow(
    `
	Changing your terminal color schemes should be easy.
	Also r/unixporn and Terminal.sexy, because relevant.

  Usage
        $  teems-cli ~/themes.json foo # activates theme named 'foo'
        $  teems-cli ~/themes.json -l  # list themes in file

  Options
  	-l, --list List all available themes
		-d, --dump Dump teems configuration variables

	 Help
		Hit me up on twitter @AyanamiVey or write an issue on https://github.com/cideM/teems-cli
`,
    {
        input: ['configPath'],
        flags: {
            list: {
                type: 'boolean',
                alias: 'l',
            },
            dump: {
                type: 'boolean',
                alias: 'd',
            },
        },
    }
)

if (Object.keys(cli.flags).length > 0) {
    if (cli.flags.list) {
        const themes = JSON.parse(fs.readFileSync(cli.input[0]))

        themes.forEach(theme => {
            console.log(theme.name)
        })
    }

    if (cli.flags.dump) {
        console.log('All supported apps')
        apps.forEach(app => console.log(app.name))
    }
} else if (cli.input.length > 0) {
    const themes = JSON.parse(fs.readFileSync(cli.input[0]))
    run(apps, themes, cli.input[1]).forEach(p => {
        p.then(result => console.log(`ok: ${result[0]}`)).catch(error => {
            console.error(`not ok: ${error.appName}: ${error.message}`)
        })
    })
} else {
    cli.showHelp()
}
