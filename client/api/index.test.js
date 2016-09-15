global = typeof window === 'undefined' ? global : window

global.Api = {
    getData: function() {
        return require('./data.test.json')
    },
    saveData: function(str) {
        console.log('Api.saveData()')
        console.log(str)
    },
    saveJSON: function(json) {
        console.log('Api.saveJSON()')
        console.log(json)
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