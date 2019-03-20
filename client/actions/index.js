import Immutable from 'immutable'
import * as types from '../constants'

// initData
export function initData(data) {
    return {
        type: types.INIT_DATA,
        data
    }
}

// global
export function globalSave(content) {
    return {
        type: types.GLOBAL_SAVE,
        content
    }
}

// project
export function projectAdd(projectName) {
    let project = Immutable.fromJS({
        id: Date.now(),
        projectName,
        active: false,
        groups: []
    })
    return {
        type: types.PROJECT_ADD,
        project
    }
}
export function projectDelete(projIndex) {
    return {
        type: types.PROJECT_DELETE,
        projIndex
    }
}
export function projectActive(projIndex) {
    return {
        type: types.PROJECT_ACTIVE,
        projIndex
    }
}
export function projectEdit(projIndex, projectName) {
    return {
        type: types.PROJECT_EDIT,
        projIndex,
        projectName
    }
}
export function projectOrder(projIndex) {
    return {
        type: types.PROJECT_ORDER,
        projIndex
    }
}

// group
export function groupAdd(projIndex, group) {
    let newGroup = Immutable.fromJS({
        id: Date.now(),
        groupName: group.groupName,
        content: group.content,
        active: false,
        expand: true,
        status: ''
    })
    return {
        type: types.GROUP_ADD,
        projIndex,
        group: newGroup
    }
}
export function groupDelete(projIndex, groupIndex) {
    return {
        type: types.GROUP_DELETE,
        projIndex,
        groupIndex
    }
}
export function groupEditing(projIndex, groupIndex) {
    return {
        type: types.GROUP_EDITING,
        projIndex,
        groupIndex
    }
}
export function groupEdit(projIndex, groupIndex, group) {
    return {
        type: types.GROUP_EDIT,
        projIndex,
        groupIndex,
        group
    }
}
export function groupDeEdit(projIndex, groupIndex) {
    return {
        type: types.GROUP_DE_EDIT,
        projIndex,
        groupIndex
    }
}
export function groupActive(projIndex, groupIndex) {
    return {
        type: types.GROUP_ACTIVE,
        projIndex,
        groupIndex
    }
}
export function groupDeActive(projIndex, groupIndex) {
    return {
        type: types.GROUP_DEACTIVE,
        projIndex,
        groupIndex
    }
}
export function groupExpand(projIndex, groupIndex, expand) {
    return {
        type: types.GROUP_EXPAND,
        projIndex,
        groupIndex,
        expand
    }
}
