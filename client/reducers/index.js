import * as types from '../constants'
import Immutable, { Map, List } from 'immutable'

export default function(state = List(), action) {
    switch(action.type) {
        case types.INIT_DATA:
            return action.data
        case types.PROJECT_ADD:
            return state.push(action.project)
        case types.PROJECT_DELETE:
            return state.deleteIn(action.projIndex)
        case types.GROUP_ADD:
            return state.mergeIn(
                [action.projIndex, 'groups'],
                List(action.group)
            )
        case types.GROUP_DELETE:
            return state.deleteIn(
                [action.projIndex, 'groups',
                action.groupIndex]
            )
        case types.GROUP_EDITING:
            return state.setIn(
                [action.projIndex, 'groups', action.groupIndex, 'status'],
                'editing'
            )
        case types.GROUP_EDIT:
            return state.mergeIn(
                [action.projIndex, 'groups', action.groupIndex],
                Map(action.group)
            )
        case types.GROUP_ACTIVE:
            return state.setIn(
                [action.projIndex, 'groups', action.groupIndex, 'active'],
                true
            )
        case types.GROUP_DEACTIVE:
            return state.mergeIn(
                [action.projIndex, 'groups', action.groupIndex, 'active'],
                false
            )
        default:
            return state
    }
}