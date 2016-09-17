const packager = require('electron-packager')
const package = require('../dist/package.json')

packager({
    dir: './dist',
    out: './out',
    name: package.name + '-v' + package.version,
    overwrite: true,
    arch: ['ia32', 'x64'],
    platform: ['linux', 'win32', 'darwin'],
    download: 'https://npm.taobao.org/mirrors/electron'
}, function(err, appPaths) {
    if(err) {
        console.log('[error] ' + err)
    } else {
        console.log('[success] ' + appPaths)
    }
})