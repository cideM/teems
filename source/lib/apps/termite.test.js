const { COLOR_LINE_REGEXP, getColor, transform } = require('../termite')
const { TEST_COLORS } = require('./shared')

const colorNames = [
    'foreground',
    'foreground_bold',
    'cursor',
    'background',
    'color0',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
    'color13',
    'color14',
    'color15',
]

test('COLOR_LINE_REGEXP', () => {
    colorNames.forEach(c => {
        expect(`${c} = #ff22AA`).toMatch(COLOR_LINE_REGEXP)
    })

    expect('#foreground = #ff22AA').not.toMatch(COLOR_LINE_REGEXP)
    expect('foreground = ##ff22AA').not.toMatch(COLOR_LINE_REGEXP)
})

test('getColor', () => {
    expect(getColor(TEST_COLORS, 'foreground')).toBe(TEST_COLORS.foreground)
    expect(getColor(TEST_COLORS, 'foreground_bold')).toBe(TEST_COLORS.foreground)
    expect(getColor(TEST_COLORS, 'background')).toBe(TEST_COLORS.background)
    expect(getColor(TEST_COLORS, 'color15')).toBe(TEST_COLORS.color15)
    expect(getColor(TEST_COLORS, 'color4')).toBe(TEST_COLORS.color4)
})

test('transform', () => {
    const _transform = transform(TEST_COLORS)

    expect(_transform('foreground = #ffaa22')).toBe('foreground = #FFFFFF')
    expect(_transform('color12 = #ffaa22')).toBe('color12 = #121212')
})

test('transform maintains whitespace and trailing chars', () => {
    const _transform = transform(TEST_COLORS)

    expect(_transform('foreground = #ffaa22        #foo')).toBe('foreground = #FFFFFF        #foo')
    expect(_transform('color12   =   #ffaa22')).toBe('color12   =   #121212')
})
