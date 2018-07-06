'use-strict'

const mkWordSel = word => new RegExp(`${word}\\s*=\\s*.*`)
const mkColorSel = () => /color(\d+).*=\s*#[a-zA-Z0-9]*/

const colorTransforms = colors =>
    Array(16).fill([mkColorSel(), (match, p1) => `color${p1} = ${colors[`color${p1}`]}`])

const makeTransforms = ({ colors }) => [
    [mkWordSel('foreground'), () => `foreground = ${colors.foreground}`],
    [mkWordSel('foreground_bold'), () => `foreground_bold = ${colors.foreground}`],
    [mkWordSel('cursor'), () => `cursor =`],
    [mkWordSel('background'), () => `background = ${colors.background}`],
    ...colorTransforms(colors),
]

module.exports = makeTransforms
