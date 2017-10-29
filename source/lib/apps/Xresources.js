const R = require("ramda");

const makeSelectorWord = word => new RegExp(`${word}:(\\s*)#[a-zA-Z0-9]*`);
const makeSelectorColor = () => /\*.color(\d+):(\s*)#[a-zA-Z0-9]*/;

const colorTransforms = colors =>
  R.times(
    () => [
      makeSelectorColor(),
      (match, p1, p2) => `*.color${p1}:${p2}${colors[`color${p1}`]}`
    ],
    16
  );

const makeTransforms = colors => [
  [
    makeSelectorWord("foreground"),
    (_, m1) => `foreground:${m1}${colors.foreground}`
  ],
  [
    makeSelectorWord("background"),
    (_, m1) => `background:${m1}${colors.background}`
  ],
  ...colorTransforms(colors)
];

module.exports = {
  makeTransforms,
  makeSelectorColor,
  makeSelectorWord
};
