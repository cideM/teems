import test from "ava";
import path from "path";
import fs from "fs";
import {
  makeTransforms,
  makeSelectorColor,
  makeSelectorWord
} from "../../source/apps/termite";
import transform from "../../source/transformer";
import mockThemes from "../helpers/mockThemes";
import { getConfig } from "../helpers/apps";

test("makeSelector creates correct regexp", t => {
  const selector = makeSelectorColor();
  const termiteColorLine = `color05     =     #65737E`;
  t.truthy(
    selector.test(termiteColorLine),
    `Should find ${selector} in ${termiteColorLine}`
  );
});

test("makeSelector creates correct regexp #2", t => {
  const selector = makeSelectorWord("foreground");
  const termiteColorLine = `foreground     =     #65737E`;
  t.truthy(
    selector.test(termiteColorLine),
    `Should find ${selector} in ${termiteColorLine}`
  );
});

test("transform transforms colors", t => {
  const targetFilePath = getConfig("termite").paths[0];
  const targetFile = fs.readFileSync(targetFilePath, { encoding: "utf8" });
  const expected = fs.readFileSync(
    path.join(__dirname, "../.config/termite/config.expected"),
    { encoding: "utf8" }
  );

  const result = transform(
    targetFile.split("\n"),
    makeTransforms(mockThemes[0].colors)
  );

  t.deepEqual(result.join("\n"), expected);
});
