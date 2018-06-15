const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')

const alacritty = require('./alacritty')
const X = require('./Xresources')
const termite = require('./termite')
const kitty = require('./kitty')

const home = os.homedir()

const apps = [
    {
        name: 'alacritty',
        paths: [
            path.join(home, '.config/alacritty/alacritty.yml'),
            path.join(xdgBase.config, 'alacritty/alacritty.yml'),
            path.join(xdgBase.config, 'alacritty.yml'),
            path.join(xdgBase.config, 'alacritty/alacritty.yml'),
            path.join(home, '.alacritty.yml'),
        ],
        makeTransforms: alacritty,
    },
    {
        name: 'Xresources',
        paths: [path.join(home, './.Xresources'), path.join(home, './.Xdefaults')],
        makeTransforms: X,
    },
    {
        name: 'termite',
        paths: [
            path.join(xdgBase.config, 'termite/config'),
            path.join(xdgBase.data, 'termite/config'),
            // path.join(home, ".config/termite/config")
        ],
        makeTransforms: termite,
    },
    {
        name: 'kitty',
        paths: [
            path.join(xdgBase.config, 'kitty/kitty.conf'),
            path.join(xdgBase.data, 'kitty/kitty.conf'),
            // path.join(home, ".config/kitty/kitty.conf")
        ],
        makeTransforms: kitty,
    },
]

module.exports = apps
