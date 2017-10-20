import test from "ava";
import { makeSelectorColor, makeSelectorWord } from "../../source/apps/termite";

test("makeSelectorWord regexp matches", t => {
  const selector = makeSelectorWord("cursor");
  const color = `cursor     =     #65737E`;
  const matchResult = color.match(selector);
  t.deepEqual(matchResult[0], color);
});

test("makeSelectorColor regexp matches", t => {
  const selector = makeSelectorColor();
  const color = `color05     =     #65737E`;
  const matchResult = color.match(selector);
  t.deepEqual(matchResult[0], color);
  t.deepEqual(matchResult[1], "05");
});
