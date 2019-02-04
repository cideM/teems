const numToHex = c => {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
}

const rgbToHex = rgb => {
    return '#' + numToHex(rgb[0]) + numToHex(rgb[1]) + numToHex(rgb[2])
}

module.exports = {
    rgbToHex,
}
