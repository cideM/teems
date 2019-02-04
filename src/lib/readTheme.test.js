const readTheme = require('./readTheme.js')

test('parses correct theme to rgba', () => {
    const test = {
        name: 'foo',
        colors: {
            color0: '#FFF',
            color1: '#ABABAB',
            color2: [255, 255, 255, 1.0],
        },
    }

    expect(readTheme(test)).toEqual({
        name: 'foo',
        colors: {
            color0: [255, 255, 255, 1.0],
            color1: [171, 171, 171, 1.0],
            color2: [255, 255, 255, 1.0],
        },
    })
})

test('throws on missing name', () => {
    const test = {}

    expect(() => readTheme(test)).toThrow()
})

test('throws on wrong hex', () => {
    const test = {
        name: 'foo',
        colors: {
            color0: '#AB',
        },
    }

    expect(() => readTheme(test)).toThrow()
})

test('throws on wrong rgba', () => {
    const test = {
        name: 'foo',
        colors: {
            color0: [255, 255, 255],
        },
    }

    expect(() => readTheme(test)).toThrow()
})
