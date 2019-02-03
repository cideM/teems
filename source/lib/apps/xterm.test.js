const { run } = require('./xterm')
const { TEST_COLORS_HEX, TEST_COLORS } = require('../testShared.js')

test('run', () => {
    let config = `
        XTerm*foreground: #c5c8c6
        XTerm*background: #1d1f21
        XTerm*color0: #1d1f21
        XTerm*color8: #969896
        XTerm*color1: #cc6666
        XTerm*color9: #cc6666
        XTerm*color2: #b5bd68
        XTerm*color10: #b5bd68
        XTerm*color3: #f0c674
        XTerm*color11: #f0c674
        XTerm*color4: #81a2be
        XTerm*color12: #81a2be
        XTerm*color5: #b294bb
        XTerm*color13: #b294bb
        XTerm*color6: #8abeb7
        XTerm*color14: #8abeb7
        XTerm*color7: #c5c8c6
        XTerm*color15: #ffffff`

    let expected = `
        XTerm*foreground: ${TEST_COLORS_HEX.foreground}
        XTerm*background: ${TEST_COLORS_HEX.background}
        XTerm*color0: ${TEST_COLORS_HEX.color0}
        XTerm*color8: ${TEST_COLORS_HEX.color8}
        XTerm*color1: ${TEST_COLORS_HEX.color1}
        XTerm*color9: ${TEST_COLORS_HEX.color9}
        XTerm*color2: ${TEST_COLORS_HEX.color2}
        XTerm*color10: ${TEST_COLORS_HEX.color10}
        XTerm*color3: ${TEST_COLORS_HEX.color3}
        XTerm*color11: ${TEST_COLORS_HEX.color11}
        XTerm*color4: ${TEST_COLORS_HEX.color4}
        XTerm*color12: ${TEST_COLORS_HEX.color12}
        XTerm*color5: ${TEST_COLORS_HEX.color5}
        XTerm*color13: ${TEST_COLORS_HEX.color13}
        XTerm*color6: ${TEST_COLORS_HEX.color6}
        XTerm*color14: ${TEST_COLORS_HEX.color14}
        XTerm*color7: ${TEST_COLORS_HEX.color7}
        XTerm*color15: ${TEST_COLORS_HEX.color15}`

    expect(run(TEST_COLORS, config)).toEqual(expected)
})
