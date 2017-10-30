import test from "ava";
import path from "path";
import fs from "fs";
import * as find from "find";
import cp from "recursive-copy";
import del from "del";
import { AssertionError } from "assert";
import themes from "../../source/cli/themes.json";
import { configs as apps } from "../../test/apps";
import {
  addConfigAndPathToAppObject,
  readFileQuiet,
  initialize
} from "./index";

const utf = { encoding: "utf8" };
const testApp = apps[0];
const testAppDotFile = testApp.paths[0];
const backupDirPath = path.join(__dirname, "../../test/backup");
const testDotfileDir = path.join(__dirname, "../../test/dotfiles");

test.before(async () => {
  try {
    // restore test files and delete files in backup dir
    await cp(
      path.join(testDotfileDir, "restore"),
      path.join(testDotfileDir, "tested"),
      { overwrite: true }
    );
    await del([path.join(backupDirPath, "/**/*")]);
  } catch (error) {
    throw error;
  }
});

test("readFileQuiet", async t => {
  const result = await readFileQuiet("foo");
  t.deepEqual(
    result,
    {
      filePath: "foo",
      configFile: ""
    },
    "Should return path and empty string for invalid path"
  );
});

test("addConfigAndPathToAppObject", async t => {
  const result = await addConfigAndPathToAppObject(testApp);
  t.is(
    result.configFile,
    fs.readFileSync(testAppDotFile, utf),
    "Should include file content"
  );
  t.is(result.name, "alacritty", "Should include app name");

  const error = await t.throws(
    addConfigAndPathToAppObject({ paths: ["foo"], name: "bar" })
  );
  t.is(error.message, "No config file found for bar");
});

test("initialize", async t => {
  t.is(initialize.length, 1);
  t.throws(() => initialize("string", "a"), Error);

  const app = initialize([]);
  t.is(app.length, 3);
  await t.throws(() => app([]), AssertionError);
});

test("activateTheme", async t => {
  const activateTheme = initialize(apps);

  const error = await t.throws(() =>
    activateTheme("blub", themes, backupDirPath)
  );
  t.is(error.message, `Couldn't find theme blub`);

  await Promise.all(activateTheme("dracula", themes, backupDirPath));

  const expectedFiles = find.fileSync(path.join(testDotfileDir, "expected"));
  const resultsFiles = find.fileSync(path.join(testDotfileDir, "tested"));

  expectedFiles.forEach((expectedPath, i) => {
    const expected = fs.readFileSync(expectedPath, utf);
    const actual = fs.readFileSync(resultsFiles[i], utf);
    t.is(actual, expected);
  });

  const actual = find.fileSync(path.join(backupDirPath)).length;
  t.is(actual, apps.length, "Backup all apps");
});
