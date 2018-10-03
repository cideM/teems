const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')
const readline = require('readline')
const fs = require('fs')
const tmp = require('tmp')

const ALACRITTY_COLOR_LINE_REGEXP = /^(\s*)(foreground|background|black|red|green|yellow|blue|magenta|cyan|white):(\s*)'0x(\w{6})'(.*)/

const ALACRITTY_BRIGHT_REGEXP = /^\s*bright:/

const getColorNum = isBright => num => (isBright ? num + 8 : num)

const newColor = (colors, color, isBright) => {
    const num = getColorNum(isBright)

    switch (color) {
        case 'foreground':
            return colors.foreground
        case 'background':
            return colors.background
        case 'black':
            return colors[`color${num(0)}`]
        case 'red':
            return colors[`color${num(1)}`]
        case 'green':
            return colors[`color${num(2)}`]
        case 'yellow':
            return colors[`color${num(3)}`]
        case 'blue':
            return colors[`color${num(4)}`]
        case 'magenta':
            return colors[`color${num(5)}`]
        case 'cyan':
            return colors[`color${num(6)}`]
        case 'white':
            return colors[`color${num(7)}`]
    }
}

const transform = (colors, isBright, str) => {
    const match = ALACRITTY_COLOR_LINE_REGEXP.exec(str)

    if (match) {
        // unused vars
        // eslint-disable-next-line
        const [_, ws1, color, ws2, __, trailing] = match

        const newColorValue = newColor(colors, color, isBright)

        return `${ws1}${color}:${ws2}'0x${newColorValue.slice(1)}'${trailing}\n`
    } else return `${str}\n`
}

const configName = 'alacritty.yml'
const paths = [
    path.join(xdgBase.config, 'alacritty', configName),
    path.join(xdgBase.config, configName),
    path.join(os.homedir(), configName),
]

const run = (colors, dryRun) =>
    new Promise((res, rej) => {
        for (const p of paths.filter(fs.existsSync)) {
            let rl
            let tmpFile

            try {
                const interfaceOpts = {
                    input: fs.createReadStream(p),
                }

                if (!dryRun) {
                    tmpFile = tmp.fileSync()
                    interfaceOpts.output = fs.createWriteStream(tmpFile.name)
                }

                rl = readline.createInterface(interfaceOpts)
            } catch (e) {
                rej(e)
            }

            rl.on('line', function(l) {
                const isBright = ALACRITTY_BRIGHT_REGEXP.test(l)
                const next = transform(colors, isBright, l)

                if (dryRun) process.stdout.write(next)
                else this.output.write(next)
            })

            rl.on('close', () => {
                if (tmpFile) fs.renameSync(tmpFile.name, p)
                res()
            })
        }
    })

const app = {
    name: 'alacritty',
    run,
}

module.exports = {
    newColor,
    ALACRITTY_COLOR_LINE_REGEXP,
    ALACRITTY_BRIGHT_REGEXP,
    transform,
    app,
}
