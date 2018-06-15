const test = require('tape')
const apps = require('./index')

const testedTheme = {
    name: 'foo',
    colors: {
        foreground: '#dcdccc',
        background: '#1f1f1f',
        color0: '#1f1f1f',
        color8: '#709080',
        color1: '#705050',
        color9: '#dca3a3',
        color2: '#60b48a',
        color10: '#c3bf9f',
        color3: '#dfaf8f',
        color11: '#f0dfaf',
        color4: '#506070',
        color12: '#94bff3',
        color5: '#dc8cc3',
        color13: '#ec93d3',
        color6: '#8cd0d3',
        color14: '#93e0e3',
        color7: '#dcdccc',
        color15: '#ffffff',
    },
}

test('each app returns a makeTransforms function', t => {
    apps.forEach(app => {
        const transforms = app.makeTransforms({ colors: testedTheme.colors })
        t.true(transforms.length > 0, `${app.name} has some transforms`)

        const areAllTuples = transforms.every(transform => transform.length === 2)
        t.true(areAllTuples, 'Each transform is a tuple')
    })

    t.end()
})
