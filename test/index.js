const test = require("ava");
const { getConfigFileAndPath, main } = require("../");
const { makeTransforms } = require("../transforms/alacritty");
const path = require("path");
const fs = require("fs");

const mockThemes = [
  {
    name: "test",
    colors: {
      foreground: "foo",
      background: "foo",
      color0: "foo",
      color1: "foo",
      color2: "foo",
      color3: "foo",
      color4: "foo",
      color5: "foo",
      color6: "foo",
      color7: "foo",
      color8: "foo2",
      color9: "foo2",
      color10: "foo2",
      color11: "foo2",
      color12: "foo2",
      color13: "foo2",
      color14: "foo2",
      color15: "foo2"
    }
  }
];

const mockApps = [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "./.config/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms
  }
];

test.beforeEach(t => {
  const backup = fs.readFileSync(
    path.join(__dirname, "./.config/alacritty/alacritty.backup.yml"),
    { encoding: "utf8" }
  );
  fs.writeFileSync(
    path.join(__dirname, "./.config/alacritty/alacritty.yml"),
    backup,
    { encoding: "utf8" }
  );
  t.context.backup = backup; // eslint-disable-line
});

test("getConfigFileAndPath should find one file and return content", t => {
  const configFiles = getConfigFileAndPath([
    path.join(__dirname, "./.config/alacritty/alacritty.yml"),
    path.join(__dirname, "./.config/alacritty/alacritty.backup.yml")
  ]);
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
  const activateTheme = main(mockApps, mockThemes);
  await activateTheme("test");
  const expected = fs.readFileSync(
    path.join(__dirname, "./.config/alacritty/alacritty.expected.yml"),
    { encoding: "utf8" }
  );
  const result = fs.readFileSync(
    path.join(__dirname, "./.config/alacritty/alacritty.yml"),
    { encoding: "utf8" }
  );
  t.is(result, expected, "Files should match");
});
