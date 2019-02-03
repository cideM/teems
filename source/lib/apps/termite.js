const path = require('path')
const { ColorNotFoundError } = require('../../errorTypes.js')

const re = /^\s*(foreground|foreground_bold|cursor|cursor_foreground|highlight|background|color\d{1,2})[\s=]*(#\w{6}|rgba\([\d,\s,.]*\)).*/

const configName = 'config'
const paths = [path.join('termite', configName), configName]

const run = (colors, input) => {
    return input
        .split('\n')
        .map(line => {
            const matches = re.exec(line)

            if (matches) {
                const [colorName, value] = matches.slice(1)

                const newValue = colors[colorName]
                if (!newValue) throw new ColorNotFoundError(colorName)

                const [r, g, b, a] = newValue
                const formatted = `rgba(${r},${g},${b},${parseFloat(a)})`

                return line.replace(value, formatted)
            } else return line
        })
        .join('\n')
}

const app = {
    name: 'termite',
    run,
    paths,
}

module.exports = {
    app,
    run,
    paths,
}
