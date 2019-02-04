const { run } = require('./kitty')
const { TEST_COLORS_HEX, TEST_COLORS } = require('../testShared.js')

test('run', () => {
    let config = `
        active_border_color #c5c8c6
        inactive_border_color #c5c8c6
        active_tab_foreground #c5c8c6
        active_tab_background #c5c8c6
        inactive_tab_foreground #c5c8c6
        inactive_tab_background #c5c8c6
        selection_foreground #c5c8c6
        selection_background #c5c8c6
        foreground #c5c8c6
        background #1d1f21
        color0 #1d1f21
        color8 #969896
        color1 #cc6666
        color9 #cc6666
        color2 #b5bd68
        color10 #b5bd68
        color3 #f0c674
        # color10 #b5bd68
        # color3 #f0c674
        color11 #f0c674
        color4 #81a2be
        color12 #81a2be
        color5 #b294bb
        color13 #b294bb
        color6 #8abeb7
        color14 #8abeb7
        color7 #c5c8c6
        color15 #ffffff`

    let expected = `
        active_border_color ${TEST_COLORS_HEX.active_border_color}
        inactive_border_color ${TEST_COLORS_HEX.inactive_border_color}
        active_tab_foreground ${TEST_COLORS_HEX.active_tab_foreground}
        active_tab_background ${TEST_COLORS_HEX.active_tab_background}
        inactive_tab_foreground ${TEST_COLORS_HEX.inactive_tab_foreground}
        inactive_tab_background ${TEST_COLORS_HEX.inactive_tab_background}
        selection_foreground ${TEST_COLORS_HEX.selection_foreground}
        selection_background ${TEST_COLORS_HEX.selection_background}
        foreground ${TEST_COLORS_HEX.foreground}
        background ${TEST_COLORS_HEX.background}
        color0 ${TEST_COLORS_HEX.color0}
        color8 ${TEST_COLORS_HEX.color8}
        color1 ${TEST_COLORS_HEX.color1}
        color9 ${TEST_COLORS_HEX.color9}
        color2 ${TEST_COLORS_HEX.color2}
        color10 ${TEST_COLORS_HEX.color10}
        color3 ${TEST_COLORS_HEX.color3}
        # color10 #b5bd68
        # color3 #f0c674
        color11 ${TEST_COLORS_HEX.color11}
        color4 ${TEST_COLORS_HEX.color4}
        color12 ${TEST_COLORS_HEX.color12}
        color5 ${TEST_COLORS_HEX.color5}
        color13 ${TEST_COLORS_HEX.color13}
        color6 ${TEST_COLORS_HEX.color6}
        color14 ${TEST_COLORS_HEX.color14}
        color7 ${TEST_COLORS_HEX.color7}
        color15 ${TEST_COLORS_HEX.color15}`

    expect(run(TEST_COLORS, config)).toEqual(expected)
})
