const { run } = require('./termite')
const { TEST_COLORS_HEX, TEST_COLORS } = require('../testShared.js')

test('run', () => {
    let config = `
#foreground_bold = #ffffff
#cursor = #dcdccc
#cursor_foreground = #dcdccc
foreground = rgba(175, 183, 192, 1.0)
background = rgba(44, 45, 48, 1.0)
#highlight = #242424
color0 = rgba(44, 45, 48, 1.0)
color1 = rgba(190, 134, 140, 1.0)
color2 = rgba(127, 157, 119, 1.0)
color3 = rgba(171, 145, 109, 1.0)
color4 = rgba(117, 154, 189, 1.0)
color5 = rgba(168, 140, 179, 1.0)
color6 = rgba(93, 161, 159, 1.0)
color7 = rgba(175, 183, 192, 1.0)
color8 = rgba(54, 58, 62, 1.0)
color9 = rgba(190, 134, 140, 1.0)
color10 = rgba(127, 157, 119, 1.0)
color11 = rgba(171, 145, 109, 1.0)
color12 = rgba(117, 154, 189, 1.0)
color13 = rgba(168, 140, 179, 1.0)
color14 = rgba(93, 161, 159, 1.0)
color15 = rgba(203, 210, 217, 1.0)
`

    let expected = `
#foreground_bold = #ffffff
#cursor = #dcdccc
#cursor_foreground = #dcdccc
foreground = rgba(${TEST_COLORS.foreground})
background = rgba(${TEST_COLORS.background})
#highlight = #242424
color0 = rgba(${TEST_COLORS.color0})
color1 = rgba(${TEST_COLORS.color1})
color2 = rgba(${TEST_COLORS.color2})
color3 = rgba(${TEST_COLORS.color3})
color4 = rgba(${TEST_COLORS.color4})
color5 = rgba(${TEST_COLORS.color5})
color6 = rgba(${TEST_COLORS.color6})
color7 = rgba(${TEST_COLORS.color7})
color8 = rgba(${TEST_COLORS.color8})
color9 = rgba(${TEST_COLORS.color9})
color10 = rgba(${TEST_COLORS.color10})
color11 = rgba(${TEST_COLORS.color11})
color12 = rgba(${TEST_COLORS.color12})
color13 = rgba(${TEST_COLORS.color13})
color14 = rgba(${TEST_COLORS.color14})
color15 = rgba(${TEST_COLORS.color15})
`

    expect(run(TEST_COLORS, config)).toEqual(expected)
})
