const path = require('path')
const fs = require('fs')

let platform = require('os').platform
let file = '/etc/hosts'

if(platform === 'win32') {
    file = path.resolve(process.env.windir, 'system32/drivers/etc/hosts')
}

window.Api = {
    backupHosts: function() {
        let backup = file + '-hosts-manager-bak'
        if(!fs.existsSync(backup)) {
            let content = fs.readFileSync(file)
            fs.writeFileSync(backup, content)
        }
    },
    getData: function() {
        if(fs.existsSync(file)) {
            this.backupHosts()
            console.log(fs.readFileSync(file).toString())
        }
        return {
            projects: []
        }
    },
    getTestData: function() {
        return require('./data.json');
    },
    saveData: function(data) {
        console.log(data)
    },
    getContent: function(projects) {
        let content = ''
        projects.forEach((project) => {
            if(project.active) {
                let groups = project.groups
                groups.forEach((group) => {
                    if(group.active) {
                        content += group.content + '\n'
                    }
                })
            }
        })
        return content
    }
}