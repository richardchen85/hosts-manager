import React, { Component, PropTypes } from 'react'
import Immutable, { List } from 'immutable'

import ListItem from '../components/listItem'

export default class Lists extends Component {

    shouldComponentUpdate(nextProps, netxtState) {
        return !Immutable.is(nextProps.project, this.props.project)
    }

    handleChange() {}
    
    render() {
        let { project } = this.props
        let groups = project.get('groups')
        return (
            <div className="list">
                <ul className="ls-list">
                    {groups && groups.map((group, index) => {
                        return <ListItem group={group} index={index} key={index} />
                    })}
                </ul>
                <div className="ls-item-add">
                    <i className="iconfont">&#xe727;</i>添加
                </div>
            </div>
        )
    }
}

Lists.propTypes = {
    project: PropTypes.instanceOf(Immutable.Map).isRequired
}