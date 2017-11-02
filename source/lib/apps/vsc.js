function makeSelectorWord() {
  // Should mach e.g., dark-elf256
  return /"workbench\.colorTheme":\s*".*"/;
}

function makeTransforms({ misc }) {
  if (!misc || !misc.vsc) {
    console.warn(`No 'vsc' property found in the selected theme.`);
  }

  return [[makeSelectorWord(), () => `"workbench.colorTheme": "${misc.vsc}"`]];
}

module.exports = {
  makeSelectorWord,
  makeTransforms
};
