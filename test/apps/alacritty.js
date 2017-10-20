import test from "ava";
import { makeSelector } from "../../source/apps/alacritty";

test("makeSelector regexp matches", t => {
  const selector = makeSelector("cursor");
  const color = `cursor: '0x65737E'`;
  const matchResult = color.match(selector);
  t.deepEqual(matchResult[0], color);
  t.deepEqual(matchResult[1], "cursor");
  t.deepEqual(matchResult[2], `'0x65737E'`);
});
