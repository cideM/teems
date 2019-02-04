const fs = require('fs')
const { Command, flags } = require('@oclif/command')

class ListThemesCommand extends Command {
    async run() {
        const { args: { config } } = this.parse(ListThemesCommand)

        try {
            const themes = JSON.parse(fs.readFileSync(config))

            themes.forEach(t => {
                this.log(t.name)
            })
        } catch (e) {
            throw new Error(`Could not read file ${config}`)
        }
    }
}

ListThemesCommand.description = `Lists all available themes in given file`

ListThemesCommand.args = [
    {
        name: 'config',
        description: 'path to themes file',
        required: true,
    },
]

module.exports = ListThemesCommand
