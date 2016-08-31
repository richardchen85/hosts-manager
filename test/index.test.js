import { expect } from 'chai'

import { createStore } from 'redux'
import Immutable from 'immutable'

import reducer from '../client/reducers'
import * as actions from '../client/actions'
import Api from '../client/api'

let store = createStore(reducer, Immutable.fromJS({
    projects: []
}))

describe('Api', function() {
    it('getData', function() {
        let data = Api.getData()
        expect(data).to.be.a('object').to.include.keys('projects')
    })
})

describe('reducers', function() {
    let data = Api.getData()
    
    it('initData', function() {
        store.dispatch(actions.initData(data))
        let state = store.getState()
        
        expect(state.has('projects')).to.be.ok
    })
    
    it('projectAdd', function() {
        let project = Immutable.fromJS({
            id: 'a',
            projectName: 'test project',
            active: false,
            groups: []
        })
        store.dispatch(actions.projectAdd(project))
        let project2 = store.getState().get('projects').last()
        
        expect(Immutable.is(project2, project)).to.be.ok
    })

    it('projectDelete', function() {
        let size = store.getState().get('projects').size

        store.dispatch(actions.projectDelete(size - 1))
        size = size - store.getState().get('projects').size

        expect(size).to.be.equal(1)
    })

    it('projectActive', function() {
        let runActive = function(index) {
            store.dispatch(actions.projectActive(index))
            let data = store.getState().get('projects')
            let activeIndex
            data.forEach((project, index) => {
                if(project.get('active')) {
                    activeIndex = index
                }
            })
            return activeIndex
        }

        expect(runActive(0)).to.be.equal(0)
        expect(runActive(1)).to.be.equal(1)
    })

    it('groupAdd', function() {
        let group = Immutable.fromJS({
            id: 'test id',
            groupName: 'test group name',
            active: false,
            status: 'editing',
            content: 'test group content'
        })

        store.dispatch(actions.groupAdd(0, group))

        let result = store.getState().getIn(['projects', 0, 'groups']).includes(group)

        expect(result).to.be.ok
    })

    it('groupDelete', function() {
        let size = store.getState().getIn(['projects', 0, 'groups']).size

        store.dispatch(actions.groupDelete(0, size - 1))

        size = size - store.getState().getIn(['projects', 0, 'groups']).size

        expect(size).to.be.equal(1)
    })

    it('groupEditing and deEditing', function() {
        store.dispatch(actions.groupEditing(0, 0))
        let status = store.getState().getIn(['projects', 0, 'groups', 0]).get('status')
        expect(status).to.be.equal('editing')

        store.dispatch(actions.groupDeEdit(0, 0))
        status = store.getState().getIn(['projects', 0, 'groups', 0]).get('status')
        expect(status).to.be.equal('')
    })

    it('groupActive and deActive', function() {
        store.dispatch(actions.groupActive(0, 0))
        let status = store.getState().getIn(['projects', 0, 'groups', 0]).get('active')
        expect(status).to.be.ok
        
        store.dispatch(actions.groupDeActive(0, 0))
        status = store.getState().getIn(['projects', 0, 'groups', 0]).get('status')
        expect(status).not.to.be.ok
    })
})