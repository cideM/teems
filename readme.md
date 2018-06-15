# teems

[![Build Status](https://travis-ci.org/cideM/teems.svg?branch=master)](https://travis-ci.org/cideM/teems)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Easily switch terminal color themes

## Why

I needed a simple program to switch the color theme of all the terminals I use. So I wrote one.

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

An example theme file can be found in the install directory of **teems**, usually `$HOME/.config/teems`. Simply add more themes to the array and make sure that foreground, background and colors 0-15 are provided.

## Contribute

Any and all contributions are absolutely amazing! Check out the [issues](https://github.com/cideM/teems/issues)!

## License

MIT © [Florian Beeres](https://github.com/cideM)
