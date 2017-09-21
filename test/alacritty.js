const test = require("ava");
const path = require("path");
const fs = require("mz/fs");
const { makeSelector, makeTransforms } = require("../transforms/alacritty");
const transform = require("../transformer");
const mockThemes = require("./helpers/mockThemes");

const mockConfig = [
  {
    name: "alacritty",
    paths: [
      path.join(__dirname, "./.config/alacritty/alacritty.yml"),
      path.join(__dirname, "foo/foo.yml")
    ],
    makeTransforms
  }
];

test("makeSelector creates correct regexp", t => {
  const selector = makeSelector("black");
  const alacrittyColorLine = `black: '0x65737E'`;
  t.truthy(
    selector.test(alacrittyColorLine),
    `Should find ${selector} in ${alacrittyColorLine}`
  );
});

test("transform transforms duplicate colors (as in alacritty conf)", t => {
  const targetFilePath = mockConfig[0].paths[0];
  const targetFile = fs.readFileSync(targetFilePath, { encoding: "utf8" });
  const expected = fs.readFileSync(
    path.join(__dirname, ".config/alacritty/alacritty.expected.yml"),
    { encoding: "utf8" }
  );

  const result = transform(
    targetFile.split("\n"),
    makeTransforms(mockThemes[0].colors)
  );
  t.deepEqual(result.join("\n"), expected);
});