const fs = require('fs')
const tmp = require('tmp')
const perLine = require('./perLine')

test('transforms lines', async () => {
    const temp = tmp.fileSync()

    const text = `
    foo
    bar
    fax
    `

    fs.writeFileSync(temp.name, text)

    const transformFn = () => 'blub'

    await perLine(temp.name, false, transformFn)

    expect(fs.readFileSync(temp.name, { encoding: 'utf8' })).toEqual('blub\nblub\nblub\nblub\n')

    temp.removeCallback()
})
