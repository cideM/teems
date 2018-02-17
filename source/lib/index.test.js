const test = require('tape')
const path = require('path')
const apps = require('./apps/index')
const run = require('./index')

const backupDirPath = path.join(__dirname, '../../test/backup')

test('run throws on wrong param', async t => {
    t.plan(1)
    try {
        await run('a', null, 'blub', backupDirPath)
        t.fail('Did not throw')
    } catch (error) {
        t.equal(error.message, `Apps must be an array`)
    }
})

test('run throws if it cant find theme', async t => {
    t.plan(1)
    try {
        await run(apps.all, [], 'blub', backupDirPath)
        t.fail('Did not throw')
    } catch (error) {
        t.equal(error.message, "Couldn't find theme blub")
    }
})

test('run throws if it is called with wrong color values in theme', async t => {
    t.plan(1)
    try {
        await run(
            apps.all,
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
        t.fail('Did not throw')
    } catch (error) {
        t.equal(
            error.message,
            `Color FFFFFF is not a valid color, in theme foo. Accepted values are #XXX and #XXXXXX`
        )
    }
})

test('run throws if it theme is missing props', async t => {
    t.plan(1)
    try {
        await run(
            apps.all,
            [
                {
                    name: 'test',
                },
            ],
            'test',
            backupDirPath
        )
        t.fail('Did not throw')
    } catch (error) {
        t.equal(error.message, `Theme test has no property "mods"`)
    }
})
