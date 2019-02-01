const {
    newColor,
    transform,
    ALACRITTY_COLOR_LINE_REGEXP,
    ALACRITTY_BRIGHT_REGEXP,
} = require('../alacritty')

const { TEST_COLORS } = require('./shared')

test('ALACRITTY_BRIGHT_REGEXP', () => {
    expect('bright:').toMatch(ALACRITTY_BRIGHT_REGEXP)
    expect('         bright:          #doijwdoijawiod').toMatch(ALACRITTY_BRIGHT_REGEXP)
    expect('#bright:').not.toMatch(ALACRITTY_BRIGHT_REGEXP)
})

const colorNames = [
    'foreground',
    'background',
    'black',
    'cursor',
    'text',
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
    expect(newColor(TEST_COLORS, 'black', false)).toEqual(TEST_COLORS.color0)
    expect(newColor(TEST_COLORS, 'black', true)).toEqual(TEST_COLORS.color8)
})

test('transform', () => {
    const line = "       black:       '0xffffff' #foo"
    const expected = "       black:       '0x000000' #foo"

    expect(transform(TEST_COLORS, false, line)).toEqual(expected)

    const line2 = "black:'0xffffff'"
    const expected2 = "black:'0x000000'"

    expect(transform(TEST_COLORS, false, line2)).toEqual(expected2)
})

test('transform returns input if no match', () => {
    const line = "#       black:       '0xffffff' #foo"
    const expected = "#       black:       '0xffffff' #foo"

    expect(transform(TEST_COLORS, false, line)).toEqual(expected)
})
