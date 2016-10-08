import React, { Component } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import GroupItem from '../components/groupItem'
import {
    groupDelete,
    groupEditing,
    groupEdit,
    groupDeEdit,
    groupActive,
    groupDeActive
} from '../actions'

class GroupList extends Component {
    constructor(props) {
        super(props)
        
        this.changeGroupActive = this.changeGroupActive.bind(this)
        this.handleGroupSubmit = this.handleGroupSubmit.bind(this)
        this.changeGroupStatus = this.changeGroupStatus.bind(this)
        this.handleGroupDelete = this.handleGroupDelete.bind(this)
    }
    
    changeGroupActive(active, index) {
        let { dispatch, projIndex } = this.props
        if(active) {
            dispatch(groupActive(projIndex, index))
        } else {
            dispatch(groupDeActive(projIndex, index))
        }
    }
    
    changeGroupStatus(status, index) {
        let { dispatch, projIndex } = this.props
        if(status) {
            dispatch(groupEditing(projIndex, index))
        } else {
            dispatch(groupDeEdit(projIndex, index))
        }
    }
    
    handleGroupSubmit(content, index) {
        let { dispatch, projIndex, groups } = this.props
        let group = groups.get(index)
        dispatch(groupEdit(projIndex, index, group.merge({
            content,
            status: ''
        })))
    }
    
    handleGroupDelete(index) {
        let { dispatch, projIndex } = this.props
        dispatch(groupDelete(projIndex, index))
    }
    
    render() {
        let { groups, projIndex } = this.props
        let {
            changeGroupActive,
            handleGroupSubmit,
            changeGroupStatus,
            handleGroupDelete
        } = this
        
        function GroupItems(group, index) {
            return <GroupItem
                group={group}
                projIndex={projIndex}
                index={index}
                key={group}
                changeActive={changeGroupActive}
                handleSubmit={handleGroupSubmit}
                changeStatus={changeGroupStatus}
                handleDelete={handleGroupDelete} />
        }

        return (
            <ul className="ls-list">
                {groups.map(GroupItems)}
            </ul>
        )
    }
}

export default connect()(GroupList)