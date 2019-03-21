const packager = require('electron-packager')
const pkg = require('../dist/package.json')
const argv = require('minimist')(process.argv.slice(2))

let platform = argv.p

icon = {
    linux: './dist/electron/hosts-manager.png',
    win32: './dist/electron/hosts-manager.ico',
    darwin: './dist/electron/hosts-manager.icns'
}

let config = {
    dir: './dist',
    out: './out',
    name: pkg.name + '-v' + pkg.version,
    overwrite: true,
    arch: ['ia32', 'x64'],
    platform: [platform],
    icon: icon[platform],
    download: 'https://npm.taobao.org/mirrors/electron'
}

packager(config, function(err, appPaths) {
    if(err) {
        console.log('[pack error] ' + err)
    } else {
        console.log('[pack success]' + appPaths)
    }
})