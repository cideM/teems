import test from 'ava'
import { makeSelectorColor, makeSelectorWord } from './termite'

test('makeSelectorWord', t => {
    const selector = makeSelectorWord('cursor')
    const color = `cursor     =     #65737E`
    const matchResult = color.match(selector)
    t.deepEqual(matchResult[0], color, 'Regexp should match')
})

test('makeSelectorColor', t => {
    const selector = makeSelectorColor()
    const color = `color05     =     #65737E`
    const matchResult = color.match(selector)
    t.deepEqual(matchResult[0], color, 'Regexp should match')
    t.deepEqual(matchResult[1], '05', 'Regexp capture group should match color number')
})
