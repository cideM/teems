import test from 'ava'
import path from 'path'
import { AssertionError } from 'assert'
import themes from '../../source/cli/themes.json'
import { normal as apps } from './apps/index'
import run from './index'

const backupDirPath = path.join(__dirname, '../../test/backup')

test('run throws on wrong param', async t => {
    const error = t.throws(() => run('a', themes, 'blub', backupDirPath), AssertionError)
    t.is(error.message, `Apps must be an array`)
})

test('run throws if it cant find theme', async t => {
    const error = await t.throws(() => run(apps, themes, 'blub', backupDirPath))
    t.is(error.message, `Couldn't find theme blub`)
})

test('run throws if it is called with wrong color values in theme', async t => {
    const error = await t.throws(() =>
        run(
            apps,
            [
                {
                    name: 'foo',
                    mods: {
                        colors: {
                            foreground: 'FFFFFF',
                        },
                    },
                },
            ],
            'blub',
            backupDirPath
        )
    )
    t.is(
        error.message,
        `Color FFFFFF is not a valid color, in theme foo. Accepted values are #XXX and #XXXXXX`
    )
})

test('run throws if it theme is missing props', async t => {
    const error = await t.throws(
        () =>
            run(
                apps,
                [
                    {
                        name: 'test',
                    },
                ],
                'test',
                backupDirPath
            ),
        AssertionError
    )
    t.is(error.message, `Theme test has no property "mods"`)
})
