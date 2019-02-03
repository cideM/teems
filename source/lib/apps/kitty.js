const path = require('path')
const { ColorNotFoundError } = require('../../errorTypes.js')
const { rgbToHex } = require('../shared.js')

const re = /^\s*(active_border_color|inactive_border_color|active_tab_foreground|active_tab_background|inactive_tab_foreground|inactive_tab_background|background|foreground|selection_foreground|selection_background|color\d{1,2}|url_color|cursor)\s*(#\w{6}).*/

const configName = 'kitty.conf'

const paths = [path.join('kitty', configName), configName]

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
    name: 'kitty',
    run,
    paths,
}

module.exports = {
    app,
    run,
    paths,
}
