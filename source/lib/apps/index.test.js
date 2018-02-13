import test from 'ava'
import { apps } from './index'
import themes from '../../cli/themes.json'

const testedTheme = themes.find(theme => theme.name === 'gruv-dark')
const testedMods = testedTheme.mods

test('each app returns a makeTransforms function', t => {
    apps.forEach(app => {
        const transforms = app.makeTransforms(testedMods)
        t.truthy(transforms.length > 0, 'App has some transforms')

        transforms.forEach(transform => {
            t.truthy(transform.length === 2, 'Each transform is a tuple')
        })
    })
})
