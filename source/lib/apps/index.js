const { app: alacritty } = require('./alacritty')
const { app: termite } = require('./termite')
const { app: xresources } = require('./xresources.js')
const { app: xterm } = require('./xterm.js')
const { app: kitty } = require('./kitty.js')

module.exports = [alacritty, termite, xresources, xterm, kitty]
