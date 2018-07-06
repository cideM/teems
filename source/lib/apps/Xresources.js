'use-strict'

const mkWordSel = word => new RegExp(`${word}:(\\s*)#[a-zA-Z0-9]*`)
const makeColorSel = () => /\*.color(\d+):(\s*)#[a-zA-Z0-9]*/

const colorTransforms = colors =>
    Array(16).fill([makeColorSel(), (match, p1, p2) => `*.color${p1}:${p2}${colors[`color${p1}`]}`])

const makeTransforms = ({ colors }) => [
    [mkWordSel('foreground'), (_, m1) => `foreground:${m1}${colors.foreground}`],
    [mkWordSel('background'), (_, m1) => `background:${m1}${colors.background}`],
    ...colorTransforms(colors),
]

module.exports = makeTransforms
