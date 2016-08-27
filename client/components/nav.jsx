import React, { Component, PropTypes } from 'react'
import Immutable, { List } from 'immutable'

export default class Nav extends Component {


    shouldComponentUpdate(nextProps, netxtState) {
        return !Immutable.is(nextProps.projects, this.props.projects)
    }

    render() {
        let { projects } = this.props
        let lists = (projects) => (
            projects.map((project, index) => (
                <li
                    className={"nav-item" + (project.get('active') ? ' active' : '')}
                    key={index}
                >
                    <span>{project.get('projectName')}</span>
                    <i className="iconfont nav-item-del" title="删除">&#xe723;</i>
                </li>
            ))
        )
        return (
            <div className="nav">
                <ul className="nav-list">
                    {lists(projects)}
                </ul>
            </div>
        )
    }
}

Nav.propTypes = {
    projects: PropTypes.instanceOf(Immutable.List).isRequired
}