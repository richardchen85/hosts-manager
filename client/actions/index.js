import * as types from '../constants'

export function initData(data) {
    return {
        type: types.INIT_DATA,
        data
    }
}

export function projectAdd(project) {
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

export function groupAdd(projIndex, group) {
    return {
        type: types.GROUP_ADD,
        projIndex,
        group
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