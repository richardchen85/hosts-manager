const packager = require('electron-packager')
const package = require('../dist/package.json')

platform = ['linux', 'win32', 'darwin']
icon = [
    './dist/electron/hosts-manager.png',
    './dist/electron/hosts-manager.ico',
    './dist/electron/hosts-manager.icns'
]

let config = {
    dir: './dist',
    out: './out',
    name: package.name + '-v' + package.version,
    overwrite: true,
    arch: ['ia32', 'x64'],
    platform: null,
    icon: null,
    download: 'https://npm.taobao.org/mirrors/electron'
}

platform.forEach((p, i) => {
    config.platform = [p]
    config.icon = icon[i]
    packager(config, function(err, appPaths) {
        if(err) {
            console.log('[pack error] ' + err)
        } else {
            console.log('[pack success]' + appPaths)
        }
    })
})