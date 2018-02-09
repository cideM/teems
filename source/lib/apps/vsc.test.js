import test from 'ava'
import { makeSelectorWord, makeTransforms } from '../../../source/lib/apps/vsc'

test('makeTransforms', t => {
    t.throws(() => makeTransforms({}), Error)
    const result = makeTransforms({
        colors: {
            color0: '#FFFFFF',
        },
        misc: {
            vsc: 'foo',
        },
    })
    t.truthy(result[0][0], 'Returns array of arrays')

    const color = `"workbench.colorTheme":       "dr acula"`
    const transform = makeTransforms({ misc: { vsc: 'bar' } })
    const actual = color.replace(transform[0][0], transform[0][1])
    const expected = `"workbench.colorTheme": "bar"`
    t.is(actual, expected, 'Transforms colors correctly')
})

test('makeSelectorWord', t => {
    const selector = makeSelectorWord()
    const color = `  "workbench.colorTheme":       "dra   cula"`
    const expected = `"workbench.colorTheme":       "dra   cula"`
    const matchResult = color.match(selector)
    t.deepEqual(matchResult[0], expected, 'colorscheme should be matched')

    const color2 = `"workbench.colorTheme":       "dr-2 acula"`
    const matchResult2 = color2.match(selector)
    t.deepEqual(matchResult2[0], color2, 'colorscheme should be matched')
})
