import test from "ava";
import path from "path";
import fs from "fs";
import { makeSelector, makeTransforms } from "../../source/apps/alacritty";
import transform from "../../source/transformer";
import mockThemes from "../helpers/mockThemes";
import { getConfig } from "../helpers/apps";

test("makeSelector creates correct regexp", t => {
  const selector = makeSelector("black");
  const alacrittyColorLine = `black: '0x65737E'`;
  t.truthy(
    selector.test(alacrittyColorLine),
    `Should find ${selector} in ${alacrittyColorLine}`
  );
});

test("transform transforms duplicate colors (as in alacritty conf)", t => {
  const targetFilePath = getConfig("alacritty").paths[0];
  const targetFile = fs.readFileSync(targetFilePath, { encoding: "utf8" });
  const expected = fs.readFileSync(
    path.join(__dirname, "../.config/alacritty/alacritty.expected.yml"),
    { encoding: "utf8" }
  );

  const result = transform(
    targetFile.split("\n"),
    makeTransforms(mockThemes[0].colors)
  );
  t.deepEqual(result.join("\n"), expected);
});
