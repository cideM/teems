function makeSelectorWord() {
  // Should mach e.g., dark-elf256 but stop at " because vim comments
  return new RegExp(`^(colo\\b|colorscheme\\b)\\s*[\\w-]*`);
}

function makeTransforms({ misc }) {
  if (!misc || !misc.nvim) {
    throw new Error(
      `No 'nvim' property found in the selected theme. You can ignore this error, it's okay!`
    );
  }

  return [[makeSelectorWord(), () => `colorscheme ${misc.nvim}`]];
}

module.exports = {
  makeSelectorWord,
  makeTransforms
};
