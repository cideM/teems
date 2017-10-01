const { makeTransforms: makeAlacrittyTransforms } = require("./alacritty");
const { makeTransforms: makeXTransforms } = require("./Xresources");

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
  }
];
