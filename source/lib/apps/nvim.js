'use-strict'

function makeSelectorWord() {
    // Should mach e.g., dark-elf256 but stop at " because vim comments
    return new RegExp(`(colo\\b|colorscheme\\b)\\s*[\\w-]*`)
}

function makeTransforms({ misc }) {
    if (misc && misc.nvim) {
        return [[makeSelectorWord(), () => `colorscheme ${misc.nvim}`]]
    } else return [[null, null]]
}

module.exports = makeTransforms
