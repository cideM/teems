const path = require('path')
const os = require('os')
const xdgBase = require('xdg-basedir')

const alacritty = require('./alacritty')
const X = require('./Xresources')
const termite = require('./termite')
const nvim = require('./nvim')
const vsc = require('./vsc')

const home = os.homedir()

// These apps support replacing something other than color values
// For example, in neovim the "colo(rshceme" value can be changed
const special = [
    {
        name: 'nvim',
        paths: [
            path.join(xdgBase.config, 'nvim/init.vim'),
            path.join(xdgBase.data, 'nvim/init.vim'),
            // path.join(home, ".config/nvim/init.vim")
        ],
        makeTransforms: nvim,
    },
    {
        name: 'vsc',
        paths: [
            path.join(xdgBase.config, 'Code - Insiders/User/settings.json'),
            path.join(xdgBase.data, 'Code - Insiders/User/settings.json'),
            // path.join(home, ".config/Code - Insiders/User/settings.json")
        ],
        makeTransforms: vsc,
    },
]

const normal = [
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
]

module.exports = {
    special,
    normal,
    apps: normal.concat(special),
}
