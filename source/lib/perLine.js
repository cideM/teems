const readline = require('readline')
const fs = require('fs')
const tmp = require('tmp')

/**
 * perLine uses streams to transform a file line by line with the given transformer
 * @param {string} fpath
 * @param {boolean} dryRun - When true, print to stdout without transforming
 * @param {function} transform
 */
const perLine = (fpath, dryRun, transform) =>
    new Promise((res, rej) => {
        let rl

        const tmpFile = tmp.fileSync()

        try {
            rl = readline.createInterface({
                input: fs.createReadStream(fpath),
                output: fs.createWriteStream(tmpFile.name),
            })
        } catch (e) {
            rej(e)
        }

        // Don't use an arrow function here, or else this binding breaks (or bind manually to readline instance)
        rl.on('line', function(l) {
            const next = transform(l)

            if (dryRun) process.stdout.write(`${next}\n`)

            this.output.write(`${dryRun ? l : next}\n`)
        })

        rl.on('close', () => {
            fs.renameSync(tmpFile.name, fpath)
            res(fpath)
        })
    })

module.exports = perLine
