function findMatchingTransformation(line, transforms) {
  return transforms.find(transformation => {
    const [regexp] = transformation;
    return regexp.test(line);
  });
}

function transform(lines, transforms, result = []) {
  if (!lines.length) return result;

  const [current] = lines;
  let remainingTransforms = transforms;
  let transformedLine = current;

  const matchingTransformation = findMatchingTransformation(
    current,
    transforms
  );

  if (matchingTransformation) {
    const [regexp, replacer] = matchingTransformation;
    transformedLine = current.replace(regexp, replacer);
    remainingTransforms = transforms.filter(
      transformation => transformation !== matchingTransformation
    );
  }

  return transform(
    lines.slice(1),
    remainingTransforms,
    result.length ? result.concat([transformedLine]) : [transformedLine]
  );
}

module.exports = transform;
