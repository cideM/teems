import test from "ava";
import path from "path";
import fs from "fs";
import * as find from "find";
import R from "ramda";
import mockThemes from "./helpers/mockThemes";
import apps from "./helpers/apps";
import { getConfigFileAndPath, initialize } from "../source/";
import restoreFiles from "./helpers/setup";

const utf = { encoding: "utf8" };

const findFiles = async dirPath =>
  new Promise(resolve => {
    find.file(dirPath, files => {
      resolve(files);
    });
  });

test.before(async () => {
  try {
    await restoreFiles();
  } catch (error) {
    throw error;
  }
});

const alacrittyPath = path.join(
  __dirname,
  "./config/tested/alacritty/alacritty.yml"
);

test("getConfigFileAndPath should find one file and return content", async t => {
  const configFiles = await getConfigFileAndPath([alacrittyPath]);
  t.truthy(configFiles.length, "Should find and return file");
  t.is(
    configFiles[0][1],
    fs.readFileSync(alacrittyPath, { encoding: "utf8" }),
    "Should find and return file"
  );
});

test("initialize function takes two parameters", t => {
  t.is(initialize.length, 2);
  t.throws(() => initialize("string", "a"), Error);
});

test("initialize function returns a function that takes one string", t => {
  const app = initialize([], []);
  t.is(app.length, 1);
  t.throws(() => app([]), Error);
});

test("initialize function transforms colors in a file", async t => {
  const activateTheme = initialize(apps, mockThemes);
  await activateTheme("test");
  const expectedFiles = await findFiles(
    path.join(__dirname, "./config/expected")
  );
  const resultsFiles = await findFiles(path.join(__dirname, "./config/tested"));

  R.forEach(([path1, path2]) => {
    const file1 = fs.readFileSync(path1, utf);
    const file2 = fs.readFileSync(path2, utf);
    t.is(file1, file2, "Files should match");
  }, R.zip(expectedFiles, resultsFiles));
});
