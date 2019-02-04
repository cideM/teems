const hexRegExp = /#[0-9a-fA-F]{3}$|#[0-9a-fA-F]{6}$/
const shortHexRegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
const longHexRegExp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

const hexToRgb = hex => {
    let temp = hex

    // This won't have an effect if the reg exp doesn't match. If it does
    // match, it expands the short hand to the longer form: FFF => FFFFFF
    temp = temp.replace(shortHexRegExp, (m, r, g, b) => r + r + g + g + b + b)

    const result = longHexRegExp.exec(temp)

    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1.0]
        : null
}

// Checks that the theme is valid and returns the same but with all color
// values transformed into RGBA values. HEX strings always have an opacity of
// 1.0 added to them
const readTheme = theme => {
    if (!theme.name) throw Error(`Theme has no name`)

    const rgbaTheme = {
        name: theme.name,
        colors: {},
    }

    for (const color of Object.keys(theme.colors)) {
        const value = theme.colors[color]

        if (typeof value === 'string') {
            if (!hexRegExp.test(value))
                throw new Error(`Value ${value} in theme ${theme.name} is not a valid hex color.`)

            rgbaTheme.colors[color] = hexToRgb(value)
            continue
        }

        if (Array.isArray(value)) {
            if (value.some(x => typeof x !== 'number'))
                throw new Error(
                    `Value ${value} appears to be a list of rgb values, but at least one of those values is not a number.`
                )

            if (value.length !== 4)
                throw new Error(
                    `Value ${value} appears to be a list of rgb values, but it does not have exactly 4 values`
                )

            rgbaTheme.colors[color] = value
            continue
        }

        throw new Error(
            `Value ${value} in theme ${
                theme.name
            } must be either a hex color string or a list of rgba values, like [255,255,255, 1.0]`
        )
    }

    return rgbaTheme
}

module.exports = readTheme
