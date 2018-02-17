const test = require('tape')
const apps = require('./index')
const themes = require('../../cli/themes.json')

const testedTheme = themes.find(theme => theme.name === 'gruv-dark')
const testedMods = testedTheme.mods

test('each app returns a makeTransforms function', t => {
    apps.all.forEach(app => {
        const transforms = app.makeTransforms(testedMods)
        t.true(transforms.length > 0, `${app.name} has some transforms`)

        const areAllTuples = transforms.every(transform => transform.length === 2)
        t.true(areAllTuples, 'Each transform is a tuple')
    })

    t.end()
})
