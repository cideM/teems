const { run } = require('./termite')
const { TEST_COLORS_HEX } = require('../testShared.js')

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

    expect(run(TEST_COLORS_HEX)(config)).toEqual(expected)
})
