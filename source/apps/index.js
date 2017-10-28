const path = require("path");
const os = require("os");
const xdgBase = require("xdg-basedir");

const { makeTransforms: makeAlacrittyTransforms } = require("./alacritty");
const { makeTransforms: makeXTransforms } = require("./Xresources");
const { makeTransforms: makeTermiteTransforms } = require("./termite");

const home = os.homedir();

module.exports = [
  {
    name: "alacritty",
    paths: [
      path.join(home, ".config/alacritty/alacritty.yml"),
      path.join(xdgBase.config, "alacritty/alacritty.yml"),
      path.join(xdgBase.config, "alacritty.yml"),
      path.join(xdgBase.config, "alacritty/alacritty.yml"),
      path.join(home, ".alacritty.yml")
    ],
    makeTransforms: makeAlacrittyTransforms
  },
  {
    name: "Xresources",
    paths: [path.join(home, "./.Xresources"), path.join(home, "./.Xdefaults")],
    makeTransforms: makeXTransforms
  },
  {
    name: "termite",
    paths: [
      path.join(xdgBase.config, "termite/config"),
      path.join(xdgBase.dataDirs, "termite/config"),
      path.join(home, ".config/termite/config")
    ],
    makeTransforms: makeTermiteTransforms
  }
];
