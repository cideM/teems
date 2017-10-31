# teems

[![Build Status](https://travis-ci.org/cideM/teems.svg?branch=master)](https://travis-ci.org/cideM/teems)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Switch unix color themes easily

## Why

I have spent obscene amounts of time trying out different color themes for terminals and/or terminal neovim. To this day I haven't really found any program that let's me switch colorschemes on the fly, without having to maintain different configuration files. If I want to change keyboard shortcuts in alacritty I want to do so in one file, without having to propagate those changes to all my other config files (containing different colors) through Git cherrypicking for example.
This library is like the third attempt and it seems the most promising so far.

## CLI

Please see the README for [teems-cli](https://github.com/cideM/teems-cli)

### Getting started

```shell
npm install --global teems
cd ~/.config/teems
vim themes.json           # Modifiy/add themes
teems-cli [name of theme] # Activate theme
```

```shell
teems-cli --help
```

It looks for configuration files for each supported app. It reads each file and replaces color values with values from the theme you are activating. Before each operation, it performs a backup of all affected files.

An example theme file can be found in the install directory of teems, usually `$HOME/.config/teems`. Simply add more themes to the array and make sure that foreground, background and colors 0-15 are provided.

You can also add an entry `"nvim": "dracula"` (replace dracula with the neovim colorscheme you would like to activate). When you activate a theme with such an entry, `teems-cli` will look for your neovim configuration, find the line `colorscheme [...]` (stopping at comments) and then simply replace the colorscheme name with the name you set in `themes.json` (here `dracula`).

## Library

There are two important buildings blocks: an array of apps, containing the paths at which config files can be found, and a `makeTransforms` function. When called with a `colors` object, it will return an array of tuples. Each tuple consists of a RegExp selector and the replacer function.
The library iterates over (through? under?) each app, uses the first config file it finds and then it runs *each line of the file* through *each transform, generated from `makeTransform(theme.colors)`*.
At the very end, it then replaces the current config file with the modified one. In other words: I tried to keep as many functions as possible pure.

Every app runs in its own promise chain. There is no `Promise.all`. The advantage is that whatever function needs to abort, can just throw an exception. It will not interfere with any other app. On the other hand, it can mean that 3/4 apps now have a new color scheme, because one threw an exception before `writeConfig`.

## API
It's not actually Typescript but I don't like JSDoc types so here's a TS signature instead.

```typescript
interface Colors {
  [color: string]: string
}

interface App {
  name: string;
  paths: string[];
  makeTransforms(ColorsType): Array<[RegExp, (color: string) => string]>;
}

interface Theme {
  name: string;
  mods: {
    colors: Colors;
    misc: {
      [appName: string]: string
    }
  }
}

interface run {
  (
    apps: Array<App>,
    themes: Array<Theme>,
    selectedTheme: string,
    backupPath: string
  ): Array<Promise<App>>
}
```

Themes is an array of objects (see `themes.json`). Every config file is read, each line run through a RegExp replacer and the replacer functions will usually return a string that includes the correct color for that line from the theme file. So e.g., `*.color0: foo` would be replaced with the value from `theme.mods.colors.color0`.

Support for apps such as neovim comes through adding a property to each theme, where the key equals the name of the app (see "Supported apps") and the value equals the *color scheme within that app*. In other words, the theme shown below ("test") will simply replace whatever color you have set in neovim (in the line `colorscheme yourcurrent-scheme123`) with `colorscheme dracula`. Whether or not you have that theme installed in neovim is up to you. If a user does not define an entry for each app, the `makeTransforms` function for *that specific app* should just throw an error. See `/apps/index.js` for examples.

## Contribute

PRs accepted. Check out the [issues](https://github.com/cideM/teems/issues)!

## License

MIT © [Florian Beeres](https://github.com/cideM)
