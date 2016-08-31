import data from './data'

export default {
    getData: function() {
        return data
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
                        content += group.content
                    }
                })
            }
        })
        return content
    }
}