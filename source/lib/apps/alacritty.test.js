const { run } = require('./alacritty')
const { TEST_COLORS, TEST_COLORS_HEX } = require('../testShared.js')

test('run', () => {
    let input = `
        background:     '0x2E3440'
        foreground:     '0xD8DEE9'

        cursor:
            cursor:       '0x3B4252'
            text:         '0xBF616A'

        normal:
            black:       '0x3B4252'
            red:         '0xBF616A'
            green:       '0xA3BE8C'
        #   green:       '0xA3BE8C'
            yellow:      '0xEBCB8B'
            blue:        '0x81A1C1'
            magenta:     '0xB48EAD'
            cyan:        '0x88C0D0'
            white:       '0xE5E9F0'

        # Bright colors
        bright:
            black:       '0x4C566A'
            red:         '0xBF616A'
            green:       '0xA3BE8C'
            yellow:      '0xEBCB8B'
            blue:        '0x81A1C1'
            magenta:     '0xB48EAD'
            cyan:        '0xA3BE8C'
            white:       '0xECEFF4'
        `

    let expected = `
        background:     '0x${TEST_COLORS_HEX.background.slice(1)}'
        foreground:     '0x${TEST_COLORS_HEX.foreground.slice(1)}'

        cursor:
            cursor:       '0x${TEST_COLORS_HEX.cursor.slice(1)}'
            text:         '0x${TEST_COLORS_HEX.text.slice(1)}'

        normal:
            black:       '0x${TEST_COLORS_HEX.color0.slice(1)}'
            red:         '0x${TEST_COLORS_HEX.color1.slice(1)}'
            green:       '0x${TEST_COLORS_HEX.color2.slice(1)}'
        #   green:       '0xA3BE8C'
            yellow:      '0x${TEST_COLORS_HEX.color3.slice(1)}'
            blue:        '0x${TEST_COLORS_HEX.color4.slice(1)}'
            magenta:     '0x${TEST_COLORS_HEX.color5.slice(1)}'
            cyan:        '0x${TEST_COLORS_HEX.color6.slice(1)}'
            white:       '0x${TEST_COLORS_HEX.color7.slice(1)}'

        # Bright colors
        bright:
            black:       '0x${TEST_COLORS_HEX.color8.slice(1)}'
            red:         '0x${TEST_COLORS_HEX.color9.slice(1)}'
            green:       '0x${TEST_COLORS_HEX.color10.slice(1)}'
            yellow:      '0x${TEST_COLORS_HEX.color11.slice(1)}'
            blue:        '0x${TEST_COLORS_HEX.color12.slice(1)}'
            magenta:     '0x${TEST_COLORS_HEX.color13.slice(1)}'
            cyan:        '0x${TEST_COLORS_HEX.color14.slice(1)}'
            white:       '0x${TEST_COLORS_HEX.color15.slice(1)}'
        `

    expect(run(TEST_COLORS, input)).toEqual(expected)
})
