const transform = (
    shouldTransformLine,
    getColorName,
    getNewLine,
    getNewState = id => id,
    transformerState = {}
) => colors => input => {
    const lines = input.split('\n')

    const reducerInitialState = {
        newLines: [],
        transformerState,
    }

    const { newLines } = lines.reduce((accumulator, currentLine) => {
        const { newLines, transformerState: state } = accumulator

        const newState = {
            ...state,
            ...getNewState(currentLine, state),
        }

        if (shouldTransformLine(currentLine, newState)) {
            const name = getColorName(currentLine, newState)

            const newColor = colors[name]

            if (!newColor) {
                console.error(`Color ${name} not found in theme. Not replacing line.`)

                return {
                    newLines: newLines.concat(currentLine),
                    transformerState: newState,
                }
            }

            const newLine = getNewLine(currentLine, newColor, newState)

            return {
                newLines: newLines.concat(newLine),
                transformerState: newState,
            }
        } else
            return {
                newLines: newLines.concat(currentLine),
                transformerState: newState,
            }
    }, reducerInitialState)

    return newLines.join('\n')
}

module.exports = transform
