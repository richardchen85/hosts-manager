import * as types from '../constants'
import Immutable, { Map, List } from 'immutable'

export default function(state = Map(), action) {
    switch(action.type) {
        case types.INIT_DATA:
            return Immutable.fromJS(action.data)
        case types.PROJECT_ADD:
            return state.set('projects', state.get('projects').push(action.project))
        case types.PROJECT_DELETE:
            return state.deleteIn(['projects', action.projIndex])
        case types.PROJECT_ACTIVE:
            let projects = state.get('projects').map((project, index) => {
                if(index === action.projIndex) {
                    return project.set('active', true)
                } else {
                    return project.set('active', false)
                }
            })
            return state.set('projects',projects)
        case types.PROJECT_DIALOG_STATUS:
            return state.merge({
                showAddProjModal: action.status
            })
        case types.GROUP_ADD:
            return state.mergeIn(
                ['projects', action.projIndex, 'groups'],
                List(action.group)
            )
        case types.GROUP_DELETE:
            return state.deleteIn(
                ['projects', action.projIndex, 'groups', action.groupIndex]
            )
        case types.GROUP_EDITING:
            return state.setIn(
                ['projects', action.projIndex, 'groups', action.groupIndex, 'status'],
                'editing'
            )
        case types.GROUP_EDIT:
            return state.mergeIn(
                ['projects', action.projIndex, 'groups', action.groupIndex],
                Map(action.group)
            )
        case types.GROUP_ACTIVE:
            return state.setIn(
                ['projects', action.projIndex, 'groups', action.groupIndex, 'active'],
                true
            )
        case types.GROUP_DEACTIVE:
            return state.mergeIn(
                ['projects', action.projIndex, 'groups', action.groupIndex, 'active'],
                false
            )
        default:
            return state
    }
}