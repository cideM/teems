# teems

[![Build Status](https://travis-ci.org/cideM/teems.svg?branch=master)](https://travis-ci.org/cideM/teems)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Easily switch terminal color themes

## Why

I needed a simple program to switch the color theme of all the terminals I use. So I wrote one.

## Getting started

```shell
npm install --global teems
nvim ~/.config/themes.json           # Add a theme
teems-cli [name of theme]  # Activate theme
```

## Usage

```shell
teems-cli --help
```

## Example file

```shell
[
    {
        "name": "zenburn",
        "colors": {
            "foreground": "#dcdccc",
            "background": "#1f1f1f",
            "color0": "#1f1f1f",
            "color8": "#709080",
            "color1": "#705050",
            "color9": "#dca3a3",
            "color2": "#60b48a",
            "color10": "#c3bf9f",
            "color3": "#dfaf8f",
            "color11": "#f0dfaf",
            "color4": "#506070",
            "color12": "#94bff3",
            "color5": "#dc8cc3",
            "color13": "#ec93d3",
            "color6": "#8cd0d3",
            "color14": "#93e0e3",
            "color7": "#dcdccc",
            "color15": "#ffffff"
        }
    }
]
```

## Contribute

Any and all contributions are absolutely amazing! Check out the [issues](https://github.com/cideM/teems/issues)!

## License

MIT © [Florian Beeres](https://github.com/cideM)
