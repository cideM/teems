const transform = (lines, transforms, result = []) => {
  if (!lines.length) return result;

  const [currentLine] = lines;

  const matchingTransformation = transforms.find(([regexp]) =>
    regexp.test(currentLine)
  );

  if (matchingTransformation) {
    const [regexp, replacer] = matchingTransformation;
    const transformedLine = currentLine.replace(regexp, replacer);

    const matchingIndex = transforms.findIndex(
      x => x === matchingTransformation
    );

    return transform(
      lines.slice(1),
      transforms.filter((_, i) => i !== matchingIndex),
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
