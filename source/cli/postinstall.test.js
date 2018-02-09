import test from 'ava'
import * as fs from 'fs'
import * as path from 'path'
import postInstall from './postinstall'
import { testPath } from '../../config/index'

const testXdgHome = path.join(testPath, 'xdghome')
const testOwnConfig = path.join(testPath, 'testconfig.json')

test('postInstall', t => {
    postInstall(testXdgHome, 'teems', testOwnConfig)

    t.true(
        fs.existsSync(path.join(testXdgHome, 'teems', 'backup')),
        'Create backup folder in config folder'
    )

    t.true(fs.existsSync(testOwnConfig), 'Create config file in module folder')

    t.is(
        fs.readFileSync(path.join(testXdgHome, 'teems', 'themes.json'), 'utf8'),
        fs.readFileSync(path.join(__dirname, '..', '..', 'source', 'cli', 'themes.json'), 'utf8'),
        'Copy example themes.json file to xdg config'
    )

    t.deepEqual(
        JSON.parse(fs.readFileSync(testOwnConfig)),
        {
            appDir: path.join(testXdgHome, 'teems'),
            backupDir: path.join(testXdgHome, 'teems/backup'),
        },
        'Store backup and config path in config file'
    )
})
