'use-strict'

const makeSelectorWord = word => new RegExp(`${word}\\s*=\\s*.*`)
const makeSelectorColor = () => /color(\d+).*=\s*#[a-zA-Z0-9]*/

const colorTransforms = colors =>
    Array(16).fill([makeSelectorColor(), (match, p1) => `color${p1} = ${colors[`color${p1}`]}`])

const makeTransforms = ({ colors }) => [
    [makeSelectorWord('foreground'), () => `foreground = ${colors.foreground}`],
    [makeSelectorWord('foreground_bold'), () => `foreground_bold = ${colors.foreground}`],
    [makeSelectorWord('cursor'), () => `cursor = `],
    [makeSelectorWord('background'), () => `background = ${colors.background}`],
    ...colorTransforms(colors),
]

module.exports = makeTransforms
