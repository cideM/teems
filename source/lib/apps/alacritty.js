const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')
const readline = require('readline')
const fs = require('fs')
const tmp = require('tmp')

const ALACRITTY_COLOR_LINE_REGEXP = /^(\s*)(cursor|text|foreground|background|black|red|green|yellow|blue|magenta|cyan|white):(\s*)'0x(\w{6})'(.*)/

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

        return `${ws1}${color}:${ws2}'0x${newColorValue.slice(1)}'${trailing}`
    } else return str
}

const configName = 'alacritty.yml'
const paths = [
    path.join(xdgBase.config, 'alacritty', configName),
    path.join(xdgBase.config, configName),
    path.join(os.homedir(), configName),
]

// Alacritty is the only app where you need surrounding context to interpret
// color names. It uses e.g., black for both color0 and color8. The correct
// color is then determined by whether black appears in the normal or bright
// block.  That's why alacritty does not use the perLine function and instead
// mostly implements it again, but while keeping track of the the bright color
// block.
const run = (colors, { dry }) =>
    paths.filter(fs.existsSync).map(
        p =>
            new Promise(res => {
                let rl
                let isBright

                const tmpFile = tmp.fileSync()

                rl = readline.createInterface({
                    input: fs.createReadStream(p),
                    output: fs.createWriteStream(tmpFile.name),
                })

                rl.on('line', function(l) {
                    isBright = ALACRITTY_BRIGHT_REGEXP.test(l)

                    const next = transform(colors, isBright, l)

                    if (dry) console.log(`${next}`)

                    this.output.write(`${dry ? l : next}\n`)
                })

                rl.on('close', () => {
                    fs.renameSync(tmpFile.name, p)
                    tmpFile.removeCallback()
                    res(p)
                })
            })
    )

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
