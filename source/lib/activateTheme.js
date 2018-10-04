const apps = require('./apps')

const run = (theme, dry) =>
    apps.forEach(a => {
        console.log(`Running transforms for ${a.name}`)

        const ps = a.run(theme.colors, { dry })

        ps.forEach(p => {
            p
                .then(fpath => console.log(`\u2705 Changed colors in ${fpath}`))
                .catch(e => console.log(`\u274C Error for ${a.name}:\n ${e}`))
        })
    })

module.exports = run
