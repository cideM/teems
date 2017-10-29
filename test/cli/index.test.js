import * as path from "path";
import * as fs from "fs";
import test from "ava";
import * as del from "del";
import { postInstall, getConfig, getThemes } from "../../source/cli/index";

const testXdgHome = path.join(__dirname, "xdghome");
const testOwnConfig = path.join(__dirname, "..", "..", "testconfig.json");

test.before(() => {
  try {
    del.sync([path.join(testXdgHome, "*"), testOwnConfig]);
  } catch (err) {
    console.log(err);
  }
});

test("postInstall", t => {
  postInstall(testXdgHome, "teems", testOwnConfig);

  t.true(
    fs.existsSync(path.join(testXdgHome, "teems", "backup")),
    "Create backup folder in config folder"
  );

  t.true(fs.existsSync(testOwnConfig), "Create config file in module folder");

  t.is(
    fs.readFileSync(path.join(testXdgHome, "teems", "themes.json"), "utf8"),
    fs.readFileSync(
      path.join(__dirname, "..", "..", "source", "cli", "themes.json"),
      "utf8"
    ),
    "Copy example themes.json file to xdg config"
  );

  t.deepEqual(
    getConfig(testOwnConfig),
    {
      appDir: path.join(testXdgHome, "teems"),
      backupDir: path.join(testXdgHome, "teems/backup")
    },
    "Store backup and config path in config file"
  );
});

test("getThemes", t => {
  t.notThrows(() => getThemes(testOwnConfig));
});
