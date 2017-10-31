const path = require("path");
const { makeTransforms: alacritty } = require("../source/lib/apps/alacritty");
const { makeTransforms: X } = require("../source/lib/apps/Xresources");
const { makeTransforms: termite } = require("../source/lib/apps/termite");
const { makeTransforms: nvim } = require("../source/lib/apps/nvim");
const { makeTransforms: vsc } = require("../source/lib/apps/vsc");

const normal = [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "dotfiles/tested/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: alacritty
  },
  {
    name: "Xresources",
    paths: [
      path.join(__dirname, "dotfiles/tested/Xresources/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: X
  },
  {
    name: "termite",
    paths: [
      path.join(__dirname, "dotfiles/tested/termite/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: termite
  }
];

const special = [
  {
    name: "nvim",
    paths: [
      path.join(__dirname, "dotfiles/tested/nvim/init.vim"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: nvim
  },
  {
    name: "vsc",
    paths: [
      path.join(
        __dirname,
        "dotfiles/tested/Code - Insiders/User/settings.json"
      ),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: vsc
  }
];

module.exports = {
  apps: normal.concat(special)
};
