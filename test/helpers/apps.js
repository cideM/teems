import * as R from "ramda";
import path from "path";
import { makeTransforms as alacrittyMakeTransforms } from "../../source/apps/alacritty";
import { makeTransforms as XMakeTransforms } from "../../source/apps/Xresources";
import { makeTransforms as termiteMakeTransforms } from "../../source/apps/termite";
import { makeTransforms as nvimMakeTransforms } from "../../source/apps/nvim";

const configs = [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "../config/tested/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: alacrittyMakeTransforms
  },
  {
    name: "Xresources",
    paths: [
      path.join(__dirname, "../config/tested/Xresources/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: XMakeTransforms
  },
  {
    name: "termite",
    paths: [
      path.join(__dirname, "../config/tested/termite/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: termiteMakeTransforms
  },
  {
    name: "nvim",
    paths: [
      path.join(__dirname, "../config/tested/nvim/init.vim"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: nvimMakeTransforms
  }
];

export const getConfig = name =>
  R.find(R.compose(R.equals(name), R.prop("name")), configs);

export default configs;
