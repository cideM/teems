# teems

[![Build Status](https://travis-ci.org/cideM/teems.svg?branch=master)](https://travis-ci.org/cideM/teems)

> Switch unix color themes easily

## Why

I have spent obscene amounts of time trying out different color themes for terminals and/or terminal neovim. To this day I haven't really found any program that let's me switch colorschemes on the fly, without having to maintain different configuration files. If I want to change keyboard shortcuts in alacritty I want to do so in one file, without having to propagate those changes to all my other config files (containing different colors) through Git cherrypicking for example.

## Getting started

```shell
npm install --global teemsjs
cd ~/.config/             # It uses your $XDG_CONFIG_DIR
nvim themes.json          # Modifiy/add themes
teems-js activate snow    # Activate theme

# Help
teems-js
```

## How

It looks for configuration files for each supported app. It reads each file and replaces color values with values from the theme you are activating. Before each operation, it performs a backup of all affected files.  An example theme file can be found in your $XDG_CONFIG_DIR, usually `$HOME/.config/teems`.

## Contribute

All kinds of contributions are more than welcome

## License

MIT © [Florian Beeres](https://github.com/cideM)
