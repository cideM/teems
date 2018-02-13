import test from 'ava'
import transform from './transformer'

const themes = [
    {
        name: 'test',
        colors: {
            color0: 'colors!0',
            foreground: 'colors!foreground',
        },
    },
]

function mockAppTransforms(colors) {
    return [
        [/(foreground).*(#[a-zA-Z0-9]*)/, (match, p1) => `${p1}: ${colors.foreground}`],
        [/(color\d).*(#[a-zA-Z0-9]*)/, (match, p1) => `${p1}: ${colors[p1]}`],
    ]
}

const mockFile = `
foreground: #FF00AA
color0: #AA2233
`

const expected = `
foreground: colors!foreground
color0: colors!0
`

test('transform does not throw', t => {
    t.notThrows(() => transform(['test'], mockAppTransforms(themes[0].colors)))
})

test('transform transforms colors', t => {
    const result = transform(mockFile.split('\n'), mockAppTransforms(themes[0].colors))
    t.deepEqual(result.join('\n'), expected, 'Should transform colors')
})
