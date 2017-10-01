import test from "ava";
import path from "path";
import fs from "fs";
import mockThemes from "./helpers/mockThemes";
import apps from "./helpers/apps";
import { getConfigFileAndPath, main } from "../source/";

const alacrittyPath = path.join(__dirname, "./.config/alacritty/alacritty.yml");
const alacrittyBackupPath = path.join(
  __dirname,
  "./.config/alacritty/alacritty.backup.yml"
);

test.beforeEach(t => {
  const backup = fs.readFileSync(alacrittyBackupPath, { encoding: "utf8" });
  fs.writeFileSync(alacrittyPath, backup, { encoding: "utf8" });
  t.context.backup = backup; // eslint-disable-line
});

test("getConfigFileAndPath should find one file and return content", t => {
  const configFiles = getConfigFileAndPath([alacrittyPath]);
  t.truthy(configFiles.length, "Should find and return file");
  t.is(configFiles[1], t.context.backup, "Should find and return file");
});

test("Main function takes one array", t => {
  t.is(main.length, 2);
  t.throws(() => main("string", "a"), Error);
});

test("Main function returns a function that takes one string", t => {
  const app = main([], []);
  t.is(app.length, 1);
  t.throws(() => app([]), Error);
});

test("Main function transforms colors in a file", async t => {
  const activateTheme = main(apps, mockThemes);
  await activateTheme("test");
  const expected = fs.readFileSync(
    path.join(__dirname, "./.config/alacritty/alacritty.expected.yml"),
    { encoding: "utf8" }
  );
  const result = fs.readFileSync(alacrittyPath, { encoding: "utf8" });
  t.is(result, expected, "Files should match");
});
