const { COLOR_LINE_REGEXP, transform } = require('../kitty')
const { TEST_COLORS } = require('./shared')

const colorNames = [
    'active_border_color',
    'foreground',
    'selection_background',
    'background',
    'inactive_border_color',
    'active_tab_foreground',
    'active_tab_background',
    'inactive_tab_foreground',
    'inactive_tab_background',
    'selection_foreground',
    'url_color',
    'cursor',
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
        expect(`${c}  #ff22AA`).toMatch(COLOR_LINE_REGEXP)
    })

    expect('#foreground  #ff22AA').not.toMatch(COLOR_LINE_REGEXP)
    expect('foreground  ##ff22AA').not.toMatch(COLOR_LINE_REGEXP)
})

test('transform', () => {
    const _transform = transform(TEST_COLORS)

    expect(_transform('foreground  #ffaa22')).toBe('foreground  #FFFFFF')
    expect(_transform('color12  #ffaa22')).toBe('color12  #121212')
})

test('transform maintains whitespace', () => {
    const _transform = transform(TEST_COLORS)

    expect(_transform('foreground  #ffaa22')).toBe('foreground  #FFFFFF')
    expect(_transform('color12      #ffaa22')).toBe('color12      #121212')
})
