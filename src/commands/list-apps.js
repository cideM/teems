const apps = require('../lib/apps/index')
const { Command } = require('@oclif/command')

class ListAppsCommand extends Command {
    async run() {
        apps.forEach(a => this.log(a.name))
    }
}

ListAppsCommand.description = `List all supported apps
`

ListAppsCommand.flags = {}

module.exports = ListAppsCommand
