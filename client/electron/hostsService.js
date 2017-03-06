const path = require('path')
const fs = require('fs')
const { dialog } = require('electron').remote

let platform = require('os').platform()
let file = '/etc/hosts'

if(platform === 'win32') {
    file = path.resolve(process.env.windir, 'system32/drivers/etc/hosts')
}

let jsonPath = path.resolve(__dirname, './electron/data.json')

window.hostsFile = {
    /**
     * 创建hosts备份文件
     */
    backup: function() {
        let backup = file + '-hosts-manager-bak'
        if(!fs.existsSync(backup)) {
            let content = fs.readFileSync(file)
            try {
                fs.writeFileSync(backup, content)
            } catch (ex) {
                alert(ex)
            }
        }
    },
    /**
     * 保存hosts信息到文件
     */
    save: function(str, json) {
        // 保存前先备份一下原始文件
        this.backup()
        try {
            fs.writeFileSync(file, str)
        } catch (ex) {
            alert(ex)
        }
    },
    /**
     * 保存到本地json文件
     */
    saveJSON: function(json) {
        try {
            fs.writeFileSync(jsonPath, json)
        } catch (ex) {
            alert(ex)
        }
    },
    /**
     * 读取本地json文件
     */
    getData: function() {
        try {
            return JSON.parse(fs.readFileSync(jsonPath))
        } catch (ex) {
            alert(ex)
        }
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
        window.hostsFile.saveJSON(JSON.stringify(jsonContent))
        window.location.reload()
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

    let json = window.hostsFile.getData()
    if(json) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(json))
        } catch (ex) {
            alert(ex)
        }
    }
}