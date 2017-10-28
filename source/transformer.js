const R = require("ramda");

const lineMatchesRegexp = line => transform => {
  const [regexp] = transform;
  return regexp.test(line);
};

const findMatchingTransformation = (line, transforms) =>
  R.find(lineMatchesRegexp(line), transforms);

const transform = (lines, transforms, result = []) => {
  if (!lines.length) return result;

  const [currentLine] = lines;
  let remainingTransforms = transforms;
  let transformedLine = currentLine;

  const matchingTransformation = findMatchingTransformation(
    currentLine,
    transforms
  );

  if (matchingTransformation) {
    const [regexp, replacer] = matchingTransformation;
    transformedLine = currentLine.replace(regexp, replacer);
    remainingTransforms = R.filter(
      transformation => transformation !== matchingTransformation,
      transforms
    );
  }

  return transform(
    lines.slice(1),
    remainingTransforms,
    result.length ? result.concat([transformedLine]) : [transformedLine]
  );
};

module.exports = transform;
