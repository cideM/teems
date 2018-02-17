#!/usr/bin/env node

'use-strict'

const meow = require('meow')
const fs = require('fs')
const path = require('path')
const run = require('../lib/index')
const apps = require('../lib/apps/index')
const config = require('../../config/index')

const cli = meow(
    `
	Changing your terminal color schemes should be easy.
	Also r/unixporn and Terminal.sexy, because relevant.

  Usage
		$  teems-cli [string] When called with one or more options, no theme will be activated and [string] will be ignored.

  Options
  	-l, --list List all available themes
		-d, --dump Dump teems configuration variables

	 Help
		Hit me up on twitter @AyanamiVey or write an issue on https://github.com/cideM/teems-cli
`,
    {
        alias: {
            l: 'list',
            d: 'dump',
        },
    }
)

const themes = JSON.parse(fs.readFileSync(path.join(config.appDir, 'themes.json')))

if (Object.keys(cli.flags).length > 0) {
    if (cli.flags.list) {
        themes.forEach(theme => {
            console.log(theme.name)
        })
    }

    if (cli.flags.dump) {
        console.log('Stored paths to your teems folder')
        console.log(config)
        console.log(' ')
        console.log(`Apps that support the "misc" property`)
        apps.special.forEach(app => console.log(app.name))
        console.log(' ')
        console.log('All supported apps')
        apps.all.forEach(app => console.log(app.name))
    }
} else if (cli.input.length > 0) {
    run(apps.all, themes, cli.input[0], config.backupDir).forEach(p => {
        p.then(result => console.log(`ok: ${result[0]}`)).catch(error => {
            console.error(`not ok: ${error.appName}: ${error.message}`)
        })
    })
} else {
    cli.showHelp()
}
