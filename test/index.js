import test from "ava";
import path from "path";
import fs from "fs";
import R from "ramda";
import mockThemes from "./helpers/mockThemes.json";
import findFiles from "./helpers/findFiles";
import apps from "./helpers/apps";
import {
  addConfigAndPathToAppObject,
  readFileQuiet,
  initialize
} from "../source/";
import { restoreFiles, clearBackups } from "./helpers/setup";

const utf = { encoding: "utf8" };

test.before(async () => {
  try {
    await restoreFiles();
  } catch (error) {
    throw error;
  }
});

test.after(async () => {
  await clearBackups();
});

const testApp = apps[0];
const { paths } = testApp;
const validPath = paths[0];

test("readFileQuiet", async t => {
  const result = await readFileQuiet("foo");
  t.deepEqual(
    result,
    {
      path: "foo",
      data: ""
    },
    "Should return path and empty string for invalid path"
  );
});

test("addConfigAndPathToAppObject", async t => {
  const configFile = await addConfigAndPathToAppObject(testApp);
  t.is(
    configFile.data,
    fs.readFileSync(validPath, { encoding: "utf8" }),
    "Should include file content"
  );
  t.is(configFile.name, "alacritty", "Should include app name");

  const error = await t.throws(
    addConfigAndPathToAppObject({ paths: ["foo"], name: "bar" })
  );
  t.is(error.message, "No config file found for bar");

  const foo = {
    name: "foo",
    paths: [path.join(__dirname, "foo/foo.yml")],
    makeTransforms: null
  };

  const error2 = await t.throws(addConfigAndPathToAppObject(foo));
  t.is(
    error2.message,
    "No config file found for foo",
    "Should throw exception if no config file is found"
  );
});

test("initialize", t => {
  t.is(initialize.length, 3);
  t.throws(() => initialize("string", "a"), Error);

  const app = initialize([], [], path.join(__dirname, "foo"));
  t.is(app.length, 1);
  t.throws(() => app([]), Error);
});

test("activateTheme", async t => {
  const activateTheme = initialize(
    apps,
    mockThemes,
    path.join(__dirname, "backup/")
  );

  await activateTheme("test");

  const expectedFiles = await findFiles(
    path.join(__dirname, "config/expected")
  );
  const resultsFiles = await findFiles(path.join(__dirname, "config/tested"));

  R.forEach(([path1, path2]) => {
    const file1 = fs.readFileSync(path1, utf).split("\n");
    const file2 = fs.readFileSync(path2, utf).split("\n");
    R.forEach(([line1, line2]) => {
      t.is(line1, line2);
    }, R.zip(file1, file2));
  }, R.zip(expectedFiles, resultsFiles));

  t.truthy(
    fs.statSync(path.join(__dirname, "backup/alacritty.yml")),
    "Should backup files before transformations"
  );
});
