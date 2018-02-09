import test from 'ava'
import { makeSelector } from './alacritty'

test('makeSelector regexp matches and preserves whitespace', t => {
    const selector = makeSelector('cursor')
    const color = `cursor:   '0x65737E'`
    const matchResult = color.match(selector)
    t.deepEqual(matchResult[0], color)
    t.deepEqual(matchResult[1], 'cursor')
    t.deepEqual(matchResult[2], `   `)
})
