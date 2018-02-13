'use-strict'

function makeSelectorWord() {
    // Should mach e.g., dark-elf256
    return /"workbench\.colorTheme":\s*".*"/
}

function makeTransforms({ misc }) {
    if (!misc || !misc.vsc) {
        throw new Error(
            `No 'vsc' property found in the selected theme. You can ignore this error, it's okay!`
        )
    }

    return [[makeSelectorWord(), () => `"workbench.colorTheme": "${misc.vsc}"`]]
}

module.exports = makeTransforms
