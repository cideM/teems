const R = require("ramda");

const makeSelectorWord = word => new RegExp(`${word}: \\s*#[a-zA-Z0-9]*`);
const makeSelectorColor = () => /\*.color(\d+):\s*#[a-zA-Z0-9]*/;

const colorTransforms = colors =>
  R.times(
    () => [
      makeSelectorColor(),
      (match, p1) => `*.color${p1}: ${colors[`color${p1}`]}`
    ],
    16
  );

const makeTransforms = colors => [
  [makeSelectorWord("foreground"), () => `foreground: ${colors.foreground}`],
  [makeSelectorWord("background"), () => `background: ${colors.background}`],
  ...colorTransforms(colors)
];

module.exports = {
  makeTransforms,
  makeSelectorColor,
  makeSelectorWord
};
