const { initialize } = require("./index");
const apps = require("./apps/");

const themes = [
  {
    name: "dracula",
    colors: {
      foreground: "#F8F8F2",
      background: "#282A36",
      color0: "#000000",
      color8: "#4D4D4D",
      color1: "#FF5555",
      color9: "#FF6E67",
      color2: "#50FA7B",
      color10: "#5AF78E",
      color3: "#F1FA8C",
      color11: "#F4F99D",
      color4: "#BD93F9",
      color12: "#CAA9FA",
      color5: "#FF79C6",
      color13: "#FF92D0",
      color6: "#8BE9FD",
      color14: "#9AEDFE",
      color7: "#BFBFBF",
      color15: "#E6E6E6"
    }
  },
  {
    name: "hybrid",
    colors: {
      foreground: "#c5c8c6",
      background: "#1d1f21",
      color0: "#282a2e",
      color8: "#373b41",
      color1: "#a54242",
      color9: "#cc6666",
      color2: "#8c9440",
      color10: "#b5bd68",
      color3: "#de935f",
      color11: "#f0c674",
      color4: "#5f819d",
      color12: "#81a2be",
      color5: "#85678f",
      color13: "#b294bb",
      color6: "#5e8d87",
      color14: "#8abeb7",
      color7: "#707880",
      color15: "#c5c8c6"
    }
  }
];

const test = initialize(apps, themes);

test("hybrid");
