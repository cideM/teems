import test from 'ava'
import { apps } from './index'

test('each app returns a makeTransforms function', t => {
    apps.forEach(app => {
        const transforms = app.makeTransforms({})
        t.truthy(transforms.length > 0, 'App has some transforms')

        transforms.forEach(transform => {
            t.truthy(transform.length === 2, 'Each transform is a tuple')
        })
    })
})
