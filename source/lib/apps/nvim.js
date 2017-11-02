function makeSelectorWord() {
  // Should mach e.g., dark-elf256 but stop at " because vim comments
  return new RegExp(`^(colo\\b|colorscheme\\b)\\s*[\\w-]*`);
}

function makeTransforms({ misc }) {
  if (!misc || !misc.nvim) {
    console.warn(`No 'nvim' property found in the selected theme.`);
  }

  return [[makeSelectorWord(), () => `colorscheme ${misc.nvim}`]];
}

module.exports = {
  makeSelectorWord,
  makeTransforms
};
