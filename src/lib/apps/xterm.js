const { ColorNotFoundError } = require('../../errorTypes.js')
const { rgbToHex } = require('../shared.js')

const re = /^\s*XTerm\*(foreground|background|color\d{1,2})[\s:]*(#\w{6})(.*)/i

const configName = '.Xresources'
const paths = [configName]

const run = (colors, input) => {
    return input
        .split('\n')
        .map(line => {
            const matches = re.exec(line)

            if (matches) {
                const [colorName, value] = matches.slice(1)

                const newValue = colors[colorName]
                if (!newValue) throw new ColorNotFoundError(colorName)

                return line.replace(value, rgbToHex(newValue))
            } else return line
        })
        .join('\n')
}

const app = {
    name: 'XTerm',
    run,
    paths,
}

module.exports = {
    app,
    run,
    paths,
}
