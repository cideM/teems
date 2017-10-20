import test from "ava";
import {
  makeSelectorWord,
  makeSelectorColor
} from "../../source/apps/Xresources";

test("makeSelectorWord regexp matches and preserves whitespace", t => {
  const selector = makeSelectorWord("foreground");
  const color = `*.foreground:     #65737E`;
  const matchResult = color.match(selector);
  t.is(matchResult[0], "foreground:     #65737E");
  t.is(matchResult[1], "     ");
});

test("makeSelectorColor regexp matches and preserves whitespace", t => {
  const selector = makeSelectorColor();
  const color = `*.color0:  #65737E`;
  const matchResult = color.match(selector);
  t.is(matchResult[0], "*.color0:  #65737E");
  t.is(matchResult[1], "0");
  t.is(matchResult[2], "  ");
});
