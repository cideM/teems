const test = require('tape')
const themes = require('../cli/themes.json')
const transform = require('./transformer')
const apps = require('./apps/index')

function hexWithoutHash(string) {
    return string.slice(1)
}

const testedTheme = themes.find(theme => theme.name === 'gruv-dark')
const testedColors = testedTheme.colors

const BEFORE = {
    alacritty: `
        colors:
        # Default colors
        primary:
            background: '0x282A36'
        cursor:
            text:       '0xF8F8F2'

        # Normal colors
        normal:
            black:      '0x000000'

        # Bright colors
        bright:
            black:      '0x4D4D4D'
    `,
    Xresources: `
        *.background: #282A36
        *.color0:     #000000
    `,
    termite: `
        # special
        foreground = #F8F8F2
        foreground_bold = #F8F8F2
        cursor =
        background = #282A36

        # black
        color0 = #000000
        color8 = #4D4D4D
    `,
    vsc: `
        "workbench.colorTheme":       "dr acula"
    `,
    nvim: `
        colo foo
    `,
    kitty: `
        foreground      #foobar
        background #blub
        color5 #fax
        color15    #ddddddddd
    `,
}

const AFTER = {
    alacritty: `
        colors:
        # Default colors
        primary:
            background: '0x${hexWithoutHash(testedColors.background)}'
        cursor:
            text:       '0x${hexWithoutHash(testedColors.foreground)}'

        # Normal colors
        normal:
            black:      '0x${hexWithoutHash(testedColors.color0)}'

        # Bright colors
        bright:
            black:      '0x${hexWithoutHash(testedColors.color8)}'
    `,
    Xresources: `
        *.background: #${hexWithoutHash(testedColors.background)}
        *.color0:     #${hexWithoutHash(testedColors.color0)}
    `,
    termite: `
        # special
        foreground = #${hexWithoutHash(testedColors.foreground)}
        foreground_bold = #${hexWithoutHash(testedColors.foreground)}
        cursor =
        background = #${hexWithoutHash(testedColors.background)}

        # black
        color0 = #${hexWithoutHash(testedColors.color0)}
        color8 = #${hexWithoutHash(testedColors.color8)}
    `,
    kitty: `
        foreground #${hexWithoutHash(testedColors.foreground)}
        background #${hexWithoutHash(testedColors.background)}
        color5 #${hexWithoutHash(testedColors.color5)}
        color15 #${hexWithoutHash(testedColors.color15)}
    `,
}

apps.forEach(app => {
    const beforeForApp = BEFORE[app.name]
    const afterForApp = AFTER[app.name]
    if (beforeForApp && afterForApp) {
        test(`transform ${app.name}`, t => {
            const transformed = transform(
                beforeForApp.split('\n'),
                app.makeTransforms({ colors: testedColors })
            ).join('\n')
            t.equal(transformed, afterForApp)
            t.end()
        })
    }
})
