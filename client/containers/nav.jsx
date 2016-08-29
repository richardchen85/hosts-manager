import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable, { List } from 'immutable'

import { projectDelete, projectActive } from '../actions'

class Nav extends Component {
    constructor() {
        super()

        this.handleDelete = this.handleDelete.bind(this)
    }

    shouldComponentUpdate(nextProps, netxtState) {
        return !Immutable.is(nextProps.projects, this.props.projects)
    }

    handleDelete(projectIndex) {
        if(confirm('Are you sure to delete ?')) {
            let { dispatch } = this.props
            dispatch(projectDelete(projectIndex))
        }
    }

    handleSelect(projectIndex) {
        let { dispatch } = this.props
        dispatch(projectActive(projectIndex))
    }

    render() {
        let { projects } = this.props
        let lists = (projects) => (
            projects.map((project, index) => (
                <li
                    className={"nav-item" + (project.get('active') ? ' active' : '')}
                    key={index}
                >
                    <span onClick={ e => this.handleSelect(index) }>
                        {project.get('projectName')}
                    </span>
                    <i className="iconfont nav-item-del" title="删除"
                       onClick={ e => this.handleDelete(index) }>&#xe723;</i>
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

export default connect()(Nav)