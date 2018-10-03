const alacritty = require('./alacritty')
const X = require('./Xresources')
const termite = require('./termite')

const home = os.homedir()

const normal = [
    {
        name: 'alacritty',

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
    all: normal.concat(special),
}
