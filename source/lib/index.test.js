import test from "ava";
import path from "path";
import fs from "fs";
import * as find from "find";
import cp from "recursive-copy";
import del from "del";
import { AssertionError } from "assert";
import themes from "../../source/cli/themes.json";
import { configs as apps } from "../../test/apps";
import run from "./index";

const utf = { encoding: "utf8" };
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

test("run", async t => {
  const error = t.throws(
    () => run("a", themes, "blub", backupDirPath),
    AssertionError
  );
  t.is(error.message, `Apps must be an array`);

  const error2 = await t.throws(() => run(apps, themes, "blub", backupDirPath));
  t.is(error2.message, `Couldn't find theme blub`);

  const error3 = await t.throws(
    () =>
      run(
        apps,
        [
          {
            name: "test"
          }
        ],
        "test",
        backupDirPath
      ),
    AssertionError
  );
  t.is(error3.message, `Theme test has no property "mods"`);

  const error4 = await t.throws(
    () =>
      run(
        apps,
        [
          {
            name: "test",
            mods: {}
          }
        ],
        "test",
        backupDirPath
      ),
    AssertionError
  );
  t.is(error4.message, `Theme test has no property "colors" in "mods"`);

  await Promise.all(run(apps, themes, "dracula", backupDirPath));

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
