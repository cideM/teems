const path = require('path')
const fs = require('fs')
const apps = require('./apps')
const xdgBase = require('xdg-basedir')

const run = (theme, dry) =>
    apps.forEach(app => {
        const { run, paths } = app

        console.log(app.name)

        const realPaths = paths
            .map(filepath => path.join(xdgBase.config, filepath))
            .filter(filepath => fs.existsSync(filepath))

        for (const filepath of realPaths) {
            const oldConfig = fs.readFileSync(filepath, 'utf-8')

            try {
                const newConfig = run(theme.colors, oldConfig)
                if (dry) {
                    console.log(`\t${newConfig}`)
                } else {
                    fs.writeFileSync(filepath, newConfig, 'utf-8')
                }
            } catch (err) {
                console.error(`\t Error: ${err.message}`)
            }
        }
    })

module.exports = run
