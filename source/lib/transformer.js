'use-strict'

/**
 * transform transforms the input lines with the given transfroms tuples.
 * Transforms are an array because for alacritty each color name is matched twice,
 * but with a different value (check tests for examples).
 * An alternative would be to keep info about whether we're in the bright or normal color
 * section in some kind of state (think Writer monad from Haskell).
 * @param {[String]} lines
 * @param {[RegExp, Function]} transforms - Tuple of regular expression and transformer function
 * @param {[String]} result
 */
const transform = (lines, transforms, result = []) => {
    if (!lines.length) return result
    const [currentLine] = lines

    const matchingTransformation = transforms.find(([regexp]) => regexp && regexp.test(currentLine))

    if (matchingTransformation) {
        const [regexp, replacer] = matchingTransformation
        const transformedLine = currentLine.replace(regexp, replacer)

        const matchingIndex = transforms.findIndex(x => x === matchingTransformation)

        // Remove the transform we used and recursive with the remaining transforms
        return transform(
            lines.slice(1),
            transforms.filter((_, i) => i !== matchingIndex),
            result.length ? result.concat([transformedLine]) : [transformedLine]
        )
    }

    return transform(
        lines.slice(1),
        transforms,
        result.length ? result.concat([currentLine]) : [currentLine]
    )
}

module.exports = transform
