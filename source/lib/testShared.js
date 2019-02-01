const { rgbToHex } = require('./shared')

const TEST_COLORS = {
    foreground: [255, 255, 255, 1],
    cursor: [204, 204, 204, 1],
    text: [221, 221, 221, 1],
    background: [187, 187, 187, 1],
    color0: [0, 0, 0, 1],
    color1: [17, 17, 17, 1],
    color2: [34, 34, 34, 1],
    color3: [35, 35, 35, 1],
    color4: [36, 36, 36, 1],
    color5: [37, 37, 37, 1],
    color6: [38, 38, 38, 1],
    color7: [39, 39, 39, 1],
    color8: [40, 40, 40, 1],
    color9: [41, 41, 41, 1],
    color10: [42, 42, 42, 1],
    color11: [43, 43, 43, 1],
    color12: [44, 44, 44, 1],
    color13: [45, 45, 45, 1],
    color14: [46, 46, 46, 1],
    color15: [47, 47, 47, 1],
    active_border_color: [48, 48, 48, 1],
    inactive_border_color: [49, 49, 49, 1],
    active_tab_background: [50, 50, 50, 1],
    active_tab_foreground: [51, 51, 51, 1],
    inactive_tab_foreground: [52, 52, 52, 1],
    inactive_tab_background: [53, 53, 53, 1],
    selection_background: [54, 54, 54, 1],
    selection_foreground: [55, 55, 55, 1],
}

const TEST_COLORS_HEX = Object.keys(TEST_COLORS).reduce((acc, colorName) => {
    return {
        ...acc,
        [colorName]: rgbToHex(TEST_COLORS[colorName]),
    }
}, {})

module.exports = {
    TEST_COLORS,
    TEST_COLORS_HEX,
}
