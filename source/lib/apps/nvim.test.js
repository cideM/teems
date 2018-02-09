import test from 'ava'
import { makeSelectorWord, makeTransforms } from '../../../source/lib/apps/nvim'

test('makeTransforms', t => {
    t.throws(() => makeTransforms({}), Error)
    const result = makeTransforms({
        colors: {
            color0: '#FFFFFF',
        },
        misc: {
            nvim: 'foo',
        },
    })
    t.truthy(result[0][0], 'Returns array of arrays')
})

test('makeSelectorWord', t => {
    const selector = makeSelectorWord()
    const color = `colorscheme       dracula`
    const matchResult = color.match(selector)
    t.deepEqual(matchResult[0], color, 'colorscheme should be matched')

    const color2 = `colo bert " COMMENTY COMMENTZ`
    const matchResult2 = color2.match(selector)
    t.deepEqual(matchResult2[0], 'colo bert', 'colo should be matched and the comment excluded')
})
