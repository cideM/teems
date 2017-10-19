import test from "ava";
import path from "path";
import * as fs from "fs";
import { makeSelectorWord, makeTransforms } from "../../source/apps/Xresources";
import transform from "../../source/transformer";
import mockThemes from "../helpers/mockThemes";
import { getConfig } from "../helpers/apps";

test("makeSelector creates correct regexp", t => {
  const selector = makeSelectorWord("foreground");
  const color = `*.foreground: #65737E`;
  t.truthy(selector.test(color), `Should find ${selector} in ${color}`);
});

test("transform transforms colors", t => {
  const targetFilePath = getConfig("Xresources").paths[0];
  const targetFile = fs.readFileSync(targetFilePath, { encoding: "utf8" });
  const expected = fs.readFileSync(
    path.join(__dirname, "../.config/Xresources/foo.expected.conf"),
    { encoding: "utf8" }
  );

  const result = transform(
    targetFile.split("\n"),
    makeTransforms(mockThemes[0].colors)
  );
  t.deepEqual(result.join("\n"), expected);
});
