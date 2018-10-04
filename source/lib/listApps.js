const apps = require('./apps/index')

const list = () => apps.forEach(a => console.log(a.name))

module.exports = list
