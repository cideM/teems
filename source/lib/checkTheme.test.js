const checkTheme = require('./checkTheme')

test('checkTheme throws on wrong color values', () => {
    const theme = {
        name: 'foo',
        colors: {
            foreground: 'FFFFFF',
        },
    }

    expect(() => checkTheme(theme)).toThrow(
        /Color FFFFFF is not a valid color, in theme foo. Accepted values are #XXX and #XXXXXX/
    )
})

test('checkTheme throws on missing color', () => {
    const theme = {
        name: 'foo',
        colors: {
            blub: 'FFFFFF',
        },
    }

    expect(() => checkTheme(theme)).toThrow(/Color foreground is missing in theme foo/)
})
