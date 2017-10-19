const { makeTransforms: makeAlacrittyTransforms } = require("./alacritty");
const { makeTransforms: makeXTransforms } = require("./Xresources");
const { makeTransforms: makeTermiteTransforms } = require("./termite");

module.exports = [
  {
    name: "alacritty",
    paths: [],
    makeTransforms: makeAlacrittyTransforms
  },
  {
    name: "X",
    paths: [],
    makeTransforms: makeXTransforms
  },
  {
    name: "termite",
    paths: [],
    makeTransforms: makeTermiteTransforms
  }
];
