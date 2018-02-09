'use-strict'

const makeSelector = word => new RegExp(`(${word}):(\\s*)'[a-zA-Z0-9]*'`)

const transformColor = color => color.replace(/#/, '0x')

const makeTransform = (selector, newColor) => [
    makeSelector(selector),
    (match, p1, p2) => `${p1}:${p2}'${transformColor(newColor)}'`,
]

const makeTransforms = ({ colors }) => [
    makeTransform('foreground', colors.foreground),
    makeTransform('background', colors.background),
    makeTransform('text', colors.foreground),
    makeTransform('cursor', colors.foreground),
    makeTransform('black', colors.color0),
    makeTransform('red', colors.color1),
    makeTransform('green', colors.color2),
    makeTransform('yellow', colors.color3),
    makeTransform('blue', colors.color4),
    makeTransform('magenta', colors.color5),
    makeTransform('cyan', colors.color6),
    makeTransform('white', colors.color7),
    makeTransform('black', colors.color8),
    makeTransform('red', colors.color9),
    makeTransform('green', colors.color10),
    makeTransform('yellow', colors.color11),
    makeTransform('blue', colors.color12),
    makeTransform('magenta', colors.color13),
    makeTransform('cyan', colors.color14),
    makeTransform('white', colors.color15),
]

module.exports = {
    makeTransforms,
    makeSelector,
}
