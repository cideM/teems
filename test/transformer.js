const test = require("ava");
const transform = require("../transformer");

const mockThemes = [
  {
    name: "test",
    colors: {
      color0: "colors!0",
      foreground: "colors!foreground"
    }
  }
];

function mockAppTransforms(colors) {
  return [
    [
      /(foreground).*(#[a-zA-Z0-9]*)/,
      (match, p1) => `${p1}: ${colors.foreground}`
    ],
    [/(color\d).*(#[a-zA-Z0-9]*)/, (match, p1) => `${p1}: ${colors[p1]}`]
  ];
}

const mockFile = `
foreground: #FF00AA
color0: #AA2233
`;

const expected = `
foreground: colors!foreground
color0: colors!0
`;

test("transform takes a string array and a transforms array", t => {
  t.is(transform.length, 2);
  t.throws(() => transform(mockFile, {}, Error));
  t.notThrows(() =>
    transform(["test"], mockAppTransforms(mockThemes[0].colors))
  );
});

test("transform replaces colors", t => {
  const result = transform(
    mockFile.split("\n"),
    mockAppTransforms(mockThemes[0].colors)
  );
  t.deepEqual(result.join("\n"), expected);
});