import path from "path";
import { makeTransforms } from "../../source/apps/alacritty";

export default [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "../.config/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms
  }
];
