const path = require('path')
const fs = require('fs')
const apps = require('../lib/apps')
const xdgBase = require('xdg-basedir')
const { Command, flags } = require('@oclif/command')
const readTheme = require('../lib/readTheme')

class ActivateCommand extends Command {
    async run() {
        const { flags: { dry }, args: { config, theme: themeName } } = this.parse(ActivateCommand)

        let themes

        try {
            themes = JSON.parse(fs.readFileSync(config))
        } catch (e) {
            throw new Error(`Could not read file ${config}`)
        }

        const theme = themes.find(t => t.name === themeName)

        if (!theme) throw new Error(`No theme with name ${themeName} found in ${config}`)

        const transformed = readTheme(theme)

        apps.forEach(app => {
            const { run, paths } = app

            this.log(app.name)

            const realPaths = paths
                .map(filepath => path.join(xdgBase.config, filepath))
                .filter(filepath => fs.existsSync(filepath))

            for (const filepath of realPaths) {
                const oldConfig = fs.readFileSync(filepath, 'utf-8')

                try {
                    const newConfig = run(transformed.colors, oldConfig)
                    if (dry) {
                        this.log(`\t${newConfig}`)
                    } else {
                        fs.writeFileSync(filepath, newConfig, 'utf-8')
                    }
                } catch (err) {
                    this.error(`\t Error: ${err.message}`)
                }
            }
        })
    }
}

ActivateCommand.description = `Activate a theme`

ActivateCommand.args = [
    { name: 'config', description: 'path to themes file', required: true },
    { name: 'theme', description: 'name of theme to activate', required: true },
]

ActivateCommand.flags = {
    dry: flags.boolean({
        char: 'd',
        description: 'prints themes after running, does not mutate any files',
        required: false,
        default: false,
    }),
}

module.exports = ActivateCommand
