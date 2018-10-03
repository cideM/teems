const {
    newColor,
    transform,
    ALACRITTY_COLOR_LINE_REGEXP,
    ALACRITTY_BRIGHT_REGEXP,
} = require('./alacritty')

const COLORS = {
    color0: '#000000',
    color8: '#888888',
}

test('ALACRITTY_BRIGHT_REGEXP', () => {
    expect('bright:').toMatch(ALACRITTY_BRIGHT_REGEXP)
    expect('         bright:          #doijwdoijawiod').toMatch(ALACRITTY_BRIGHT_REGEXP)
    expect('#bright:').not.toMatch(ALACRITTY_BRIGHT_REGEXP)
})

const colorNames = [
    'foreground',
    'background',
    'black',
    'red',
    'green',
    'yellow',
    'magenta',
    'blue',
    'white',
    'cyan',
]

test('ALACRITTY_COLOR_LINE_REGEXP', () => {
    colorNames.forEach(n => {
        expect(`${n}:'0xFFaa22'`).toMatch(ALACRITTY_COLOR_LINE_REGEXP)
        expect(`         ${n}:          '0xFFaa22'`).toMatch(ALACRITTY_COLOR_LINE_REGEXP)
        expect(`#${n}:`).not.toMatch(ALACRITTY_COLOR_LINE_REGEXP)
    })
})

test('newColor', () => {
    expect(newColor(COLORS, 'black', false)).toEqual(COLORS.color0)
    expect(newColor(COLORS, 'black', true)).toEqual(COLORS.color8)
})

test('transform', () => {
    const line = "       black:       '0xffffff' #foo"
    const expected = "       black:       '0x000000' #foo"

    expect(transform(COLORS, false, line)).toEqual(expected)

    const line2 = "black:'0xffffff'"
    const expected2 = "black:'0x000000'"

    expect(transform(COLORS, false, line2)).toEqual(expected2)
})

test('transform returns input if no match', () => {
    const line = "#       black:       '0xffffff' #foo"
    const expected = "#       black:       '0xffffff' #foo"

    expect(transform(COLORS, false, line)).toEqual(expected)
})
