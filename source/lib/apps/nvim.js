function makeSelectorWord() {
  // Should mach e.g., dark-elf256 but stop at " because vim comments
  return new RegExp(`^(colo\\b|colorscheme\\b)\\s*[\\w-]*`);
}

function makeTransforms(colors) {
  if (!colors.nvim) {
    throw new Error(
      `No 'nvim' property found in the selected theme. You can ignore this error, it's okay!`
    );
  }

  return [[makeSelectorWord(), () => `colorscheme ${colors.nvim}`]];
}

module.exports = {
  makeSelectorWord,
  makeTransforms
};
