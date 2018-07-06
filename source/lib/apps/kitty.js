'use-strict'

const mkWordSel = word => new RegExp(`\\b${word}\\b.*#[a-zA-Z0-9]*`, 'g')
const mkColorSel = () => /color(\d+)\s*#[a-zA-Z0-9]*/

const colorTransforms = colors =>
    Array(16).fill([mkColorSel(), (match, p1) => `color${p1} ${colors[`color${p1}`]}`])

const makeTransforms = ({ colors }) => [
    [mkWordSel('foreground'), () => `foreground ${colors.foreground}`],
    [mkWordSel('background'), () => `background ${colors.background}`],
    ...colorTransforms(colors),
]

module.exports = makeTransforms
