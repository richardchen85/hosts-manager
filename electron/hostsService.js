const path = require('path')
const fs = require('fs')

let platform = require('os').platform()
let file = '/etc/hosts'

if(platform === 'win32') {
    file = path.resolve(process.env.windir, 'system32/drivers/etc/hosts')
}

let jsonPath = path.resolve(__dirname, '../electron/data.json')

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