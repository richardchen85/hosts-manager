const packager = require('electron-packager')

packager({
    dir: './dist',
    out: './out',
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