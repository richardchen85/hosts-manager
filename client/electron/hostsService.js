const path = require('path')
const fs = require('fs')
const { dialog } = require('electron').remote
const { save, saveJSON, getJSON } = require('./electron/hosts')
const io = require('./electron/io')

let pwdCallback = null

function showPwdDialog(callback) {
    const dialog = document.querySelector('.pwd-dialog')
    dialog.classList.remove('hide')
    dialog.querySelector('.txt-pwd').focus()
    pwdCallback = callback
}

window.hostsFile = {
    /**
     * 保存hosts信息到文件
     */
    save: function(str, pwd) {
        return save(str, pwd).catch(e => {
            if (e === 'need_sudo') {
                showPwdDialog(function (pwd) {
                    hostsFile.save(str, pwd)
                })
            } else {
                alert('save error: ' + JSON.stringify(e))
            }
            return null
        })
    },
    /**
     * 保存到本地json文件
     */
    saveJSON: function(json) {
        return saveJSON(json).catch(e => {
            throw new Error('saveJSON error: ' + JSON.stringify(e))
        })
    },
    /**
     * 读取本地json文件
     */
    getData: function() {
        return getJSON().then(data => {
            return JSON.parse(data)
        }).catch(e => {
            throw new Error('getData error: ' + JSON.stringify(e))
        })
    }
}

// 代理事件绑定
window.addEventListener('load', function(){
    document.body.addEventListener('click', function(e) {
        let elemId = e.target.id
        // 导入配置
        if(elemId === 'importBtn') {
            doImport()
        } else if(elemId === 'exportBtn') {
            doExport()
        }
    }, false)
    document.querySelector('.pwd-dialog .txt-pwd').addEventListener('keyup', function (e) {
        const txt = e.currentTarget
        if (e.keyCode === 13 && pwdCallback) {
            pwdCallback(txt.value)
            txt.parentNode.parentNode.classList.add('hide')
            txt.value = ''
        }
    }, false)
}, false)

// 导入配置
function doImport() {
    let filePath = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {name: 'Json Files', extensions: ['json']},
            {name: 'All Files', extensions: ['*']}
        ]
    })[0]

    if(!filePath) {
        return
    }

    let jsonContent
    try {
        jsonContent = JSON.parse(fs.readFileSync(filePath))
    } catch (ex) {
        alert(ex)
    }

    // 判断内容格式的正确性
    if(jsonContent.global && jsonContent.projects && jsonContent.projects instanceof Array) {
        window.hostsFile.saveJSON(JSON.stringify(jsonContent)).then(() => {
            window.location.reload()
        }).catch(e => {
            alert('import error: ' + e)
        })
    } else {
        alert('Import failed!\nFile type must be .json, and has two field: "global(String)" and "projects(Array)"')
    }
}

// 导出配置
function doExport() {
    let filePath = dialog.showSaveDialog({
        properties: ['openFile'],
        filters: [
            {name: 'Json Files', extensions: ['json']},
            {name: 'All Files', extensions: ['*']}
        ]
    })

    if(!filePath) {
        return
    }

    window.hostsFile.getData().then(data => {
        return fs.writeFileSync(filePath, JSON.stringify(data))
    }).catch(e => {
        alert('export error: ' + e)
    })
}