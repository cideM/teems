const transform = (lines, transforms, result = []) => {
  if (!lines.length) return result;

  const [currentLine] = lines;

  const matchingTransformation = transforms.find(([regexp]) =>
    regexp.test(currentLine)
  );

  if (matchingTransformation) {
    const [regexp, replacer] = matchingTransformation;
    const transformedLine = currentLine.replace(regexp, replacer);

    return transform(
      lines.slice(1),
      transforms.filter(x => x !== matchingTransformation),
      result.length ? result.concat([transformedLine]) : [transformedLine]
    );
  }

  return transform(
    lines.slice(1),
    transforms,
    result.length ? result.concat([currentLine]) : [currentLine]
  );
};

module.exports = transform;
