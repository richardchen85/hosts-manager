let isTest = !process.env.NODE_ENV

export default {
    getData: function() {
        return isTest ? this.getTestData() : {
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