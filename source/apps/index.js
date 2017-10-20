const path = require("path");
const os = require("os");
const { makeTransforms: makeAlacrittyTransforms } = require("./alacritty");
const { makeTransforms: makeXTransforms } = require("./Xresources");
const { makeTransforms: makeTermiteTransforms } = require("./termite");

const home = os.homedir();

module.exports = [
  {
    name: "alacritty",
    paths: [path.join(home, ".config/alacritty/alacritty.yml")],
    makeTransforms: makeAlacrittyTransforms
  },
  {
    name: "Xresources",
    paths: [path.join(home, "./.Xresources")],
    makeTransforms: makeXTransforms
  },
  {
    name: "termite",
    paths: [path.join(home, ".config/termite/config")],
    makeTransforms: makeTermiteTransforms
  }
];
