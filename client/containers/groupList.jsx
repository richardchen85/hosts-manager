import React, { Component, PropTypes } from 'react'
import Immutable, { List } from 'immutable'

import GroupItem from './groupItem'
import { connect } from 'react-redux'

class GroupList extends Component {
    shouldComponentUpdate(nextProps, netxtState) {
        return !Immutable.is(nextProps.project, this.props.project)
    }
    
    render() {
        let { project, projIndex } = this.props
        let groups = project.get('groups')

        if(!groups || groups.size === 0) {
            return <div className="list"/>
        }

        return (
            <div className="list">
                <ul className="ls-list">
                    {groups.map((group, index) => (
                        <GroupItem group={group} projIndex={projIndex} index={index} key={index} />
                    ))}
                </ul>
                <div className="ls-item-add">
                    <i className="iconfont">&#xe727;</i>添加
                </div>
            </div>
        )
    }
}

GroupList.propTypes = {
    project: PropTypes.instanceOf(Immutable.Map).isRequired,
    projIndex: PropTypes.number
}

export default connect()(GroupList)