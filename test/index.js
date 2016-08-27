const Immutable = require('immutable')
const { Map, List } = Immutable

let data = Immutable.fromJS([
    {
        id: '1',
        projectName: 'project 1',
        groups: [
            {
                id: 'a',
                groupName: 'group a',
                active: false,
                status: '',
                content: 'this is group a'
            }
        ]
    }
])

let a = data.push(Map({
    id: '2',
    projectName: 'project 2',
    groups: [
        {
            id: 'b',
            groupName: 'group b',
            active: false,
            status: '',
            content: 'this is group b'
        }
    ]
}))
console.log(a.size)

let b = data.delete(0)
console.log(b.size)