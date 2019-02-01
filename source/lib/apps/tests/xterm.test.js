const { COLOR_LINE_REGEXP, transform } = require('../XTerm')
const { TEST_COLORS } = require('./shared')

const colorNames = [
    'foreground',
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
        expect(`XTerm*${c}: #ff22AA`).toMatch(COLOR_LINE_REGEXP)
    })

    expect('#XTerm*foreground: #ff22AA').not.toMatch(COLOR_LINE_REGEXP)
    expect('foreground: ##ff22AA').not.toMatch(COLOR_LINE_REGEXP)
})

test('transform', () => {
    const _transform = transform(TEST_COLORS)

    expect(_transform('XTerm*foreground: #ffaa22')).toBe('XTerm*foreground: #FFFFFF')
    expect(_transform('XTerm*color12: #ffaa22')).toBe('XTerm*color12: #121212')
})

test('transform maintains whitespace and trailing chars', () => {
    const _transform = transform(TEST_COLORS)

    expect(_transform('XTerm*foreground : #ffaa22        #foo')).toBe(
        'XTerm*foreground : #FFFFFF        #foo'
    )
    expect(_transform('XTerm*color12   :   #ffaa22')).toBe('XTerm*color12   :   #121212')
})
