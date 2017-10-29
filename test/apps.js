const R = require("ramda");
const path = require("path");
const {
  makeTransforms: alacrittyMakeTransforms
} = require("../source/lib/apps/alacritty");
const {
  makeTransforms: XMakeTransforms
} = require("../source/lib/apps/Xresources");
const {
  makeTransforms: termiteMakeTransforms
} = require("../source/lib/apps/termite");
const {
  makeTransforms: nvimMakeTransforms
} = require("../source/lib/apps/nvim");

const configs = [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "dotfiles/tested/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: alacrittyMakeTransforms
  },
  {
    name: "Xresources",
    paths: [
      path.join(__dirname, "dotfiles/tested/Xresources/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: XMakeTransforms
  },
  {
    name: "termite",
    paths: [
      path.join(__dirname, "dotfiles/tested/termite/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: termiteMakeTransforms
  },
  {
    name: "nvim",
    paths: [
      path.join(__dirname, "dotfiles/tested/nvim/init.vim"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: nvimMakeTransforms
  }
];

const getConfig = name =>
  R.find(R.compose(R.equals(name), R.prop("name")), configs);

module.exports = {
  getConfig,
  configs
};
