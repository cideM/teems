# teems

[![Build Status](https://travis-ci.org/cideM/teems.svg?branch=master)](https://travis-ci.org/cideM/teems)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Switch unix color themes easily

## Why
I have spent obscene amounts of time trying out different color themes for terminals and/or terminal neovim. To this day I haven't really found any program that let's me switch colorschemes on the fly, without having to maintain different configuration files. If I want to change keyboard shortcuts in alacritty I want to do so in one file, without having to propagate those changes to all my other config files (containing different colors) through Git cherrypicking for example.
This library is like the third attempt and it seems the most promising so far. 

## How it works
It looks for configuration files in the locations indicated by each supported app. It reads each file and looks for the lines containing the color information. It then replaces each color with a color from the themefile you provided, from the theme you are currently activating. Before each operation, it performs a backup.

## Roadmap
*  Add custom locations through config file
*  Support more apps
    * URxvt
    * Gnome terminal
    * XFCE4-Terminal
* Add support for RGBA (and possibly other) values

## Supported apps
*  Alacritty
*  Termite
*  X (Xresources/Xdefaults)

## Usage

```
// initialize :: apps[], themes[], string -> string -> apps[]
function initialize(apps, themes, backupPath) {
```

Themes is an array of objects. Every config file is read, each line run through a RegExp replacer and the replacer functions will usually return a string that includes the correct color for that line from the theme file. So e.g., `*.color0: foo` would be replaced with the value from `theme.color0`.

```
export default [
  {
    name: "test",
    colors: {
      foreground: "#FFFFFF",
      background: "#000000",
      color0: "#FFFF00",
      color1: "#FFFF01",
      color2: "#FFFF02",
      color3: "#FFFF03",
      color4: "#FFFF04",
      color5: "#FFFF05",
      color6: "#FFFF06",
      color7: "#FFFF07",
      color8: "#FFFF08",
      color9: "#FFFF09",
      color10: "#FFFF10",
      color11: "#FFFF11",
      color12: "#FFFF12",
      color13: "#FFFF13",
      color14: "#FFFF14",
      color15: "#FFFF15"
    }
  }
];
```

Apps look like this:
```
module.exports = [
  {
    name: "alacritty",
    paths: [
      path.join(home, ".config/alacritty/alacritty.yml"),
      path.join(xdgBase.config, "alacritty/alacritty.yml"),
      path.join(xdgBase.config, "alacritty.yml"),
      path.join(xdgBase.config, "alacritty/alacritty.yml"),
      path.join(home, ".alacritty.yml")
    ],
    makeTransforms: makeAlacrittyTransforms
  },
  {
    name: "Xresources",
    paths: [path.join(home, "./.Xresources"), path.join(home, "./.Xdefaults")],
    makeTransforms: makeXTransforms
  },
  {
    name: "termite",
    paths: [
      path.join(xdgBase.config, "termite/config"),
      path.join(xdgBase.dataDirs, "termite/config"),
      path.join(home, ".config/termite/config")
    ],
    makeTransforms: makeTermiteTransforms
  }
];
```

## Install

```shell
npm install --save teems
```

TODO

## Contribute

PRs accepted. Check out the [issues](https://github.com/cideM/teems/issues)!

## License

MIT © [Florian Beeres](https://github.com/cideM)
