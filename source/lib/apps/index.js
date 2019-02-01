const { app: alacritty } = require('./alacritty')
const { app: termite } = require('./termite')
const { app: xresources } = require('./Xresources')
const { app: xterm } = require('./XTerm')

module.exports = [alacritty, termite, xresources]
