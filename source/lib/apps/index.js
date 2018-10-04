const { app: alacritty } = require('./alacritty')
const { app: termite } = require('./termite')
const { app: xresources } = require('./Xresources')

module.exports = [alacritty, termite, xresources]
