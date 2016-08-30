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
})