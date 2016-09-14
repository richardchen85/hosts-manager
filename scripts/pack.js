const packager = require('electron-packager')

packager({
    dir: './dist',
    out: './out',
    all: true,
    download: 'https://npm.taobao.org/mirrors/electron'
}, function(err, appPaths) {
    if(err) {
        console.log('[error] ' + err)
    } else {
        console.log('app published to ' + appPaths)
    }
})