import test from "ava";
import {
  makeSelectorWord,
  makeSelectorColor
} from "../../source/apps/Xresources";

test("makeSelectorWord regexp matches", t => {
  const selector = makeSelectorWord("foreground");
  const color = `*.foreground: #65737E`;
  const matchResult = color.match(selector);
  t.deepEqual(matchResult[0], "foreground: #65737E");
});

test("makeSelectorColor regexp matches", t => {
  const selector = makeSelectorColor();
  const color = `*.color0: #65737E`;
  const matchResult = color.match(selector);
  t.deepEqual(matchResult[0], "*.color0: #65737E");
  t.deepEqual(matchResult[1], "0");
});
