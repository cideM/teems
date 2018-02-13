'use-strict'

function makeSelectorWord() {
    // Should mach e.g., dark-elf256
    return /"workbench\.colorTheme":\s*".*"/
}

function makeTransforms({ misc }) {
    if (misc && misc.vsc) {
        return [[makeSelectorWord(), () => `"workbench.colorTheme": "${misc.vsc}"`]]
    } else return [[null, null]]
}

module.exports = makeTransforms
