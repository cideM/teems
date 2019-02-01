const apps = require('./apps')

const run = (theme, dry) =>
    apps.forEach(app => {
        console.log(`Running transforms for ${app.name}`)

        const promises = app.run(theme.colors, { dry })

        promises.forEach(promise => {
            promise
                .then(fpath => console.log(`\u2705 Changed colors in ${fpath}`))
                .catch(e => console.log(`\u274C Error for ${app.name}:\n ${e}`))
        })
    })

module.exports = run
