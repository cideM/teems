const { run } = require('./alacritty')
const { TEST_COLORS } = require('./shared')

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
        background:     '0x${TEST_COLORS.background}'
        foreground:     '0x${TEST_COLORS.foreground}'

        cursor:
            cursor:       '0x${TEST_COLORS.cursor}'
            text:         '0x${TEST_COLORS.text}'

        normal:
            black:       '0x${TEST_COLORS.color0}'
            red:         '0x${TEST_COLORS.color1}'
            green:       '0x${TEST_COLORS.color2}'
        #   green:       '0xA3BE8C'
            yellow:      '0x${TEST_COLORS.color3}'
            blue:        '0x${TEST_COLORS.color4}'
            magenta:     '0x${TEST_COLORS.color5}'
            cyan:        '0x${TEST_COLORS.color6}'
            white:       '0x${TEST_COLORS.color7}'

        # Bright colors
        bright:
            black:       '0x${TEST_COLORS.color8}'
            red:         '0x${TEST_COLORS.color9}'
            green:       '0x${TEST_COLORS.color10}'
            yellow:      '0x${TEST_COLORS.color11}'
            blue:        '0x${TEST_COLORS.color12}'
            magenta:     '0x${TEST_COLORS.color13}'
            cyan:        '0x${TEST_COLORS.color14}'
            white:       '0x${TEST_COLORS.color15}'
        `

    expect(run(TEST_COLORS)(input)).toEqual(expected)
})
