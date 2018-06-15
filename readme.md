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

## Contribute

Any and all contributions are absolutely amazing! Check out the [issues](https://github.com/cideM/teems/issues)!

## License

MIT © [Florian Beeres](https://github.com/cideM)
