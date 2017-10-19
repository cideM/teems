import * as R from "ramda";
import path from "path";
import { makeTransforms as alacrittyMakeTransforms } from "../../source/apps/alacritty";
import { makeTransforms as XMakeTransforms } from "../../source/apps/Xresources";
import { makeTransforms as termiteMakeTransforms } from "../../source/apps/termite";

const configs = [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "../.config/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: alacrittyMakeTransforms
  },
  {
    name: "Xresources",
    paths: [
      path.join(__dirname, "../.config/Xresources/foo.conf"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: XMakeTransforms
  },
  {
    name: "termite",
    paths: [
      path.join(__dirname, "../.config/termite/config"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms: termiteMakeTransforms
  }
];

export const getConfig = name =>
  R.find(R.compose(R.equals(name), R.prop("name")), configs);

export default configs;
