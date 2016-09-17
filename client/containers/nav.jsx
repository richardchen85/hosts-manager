import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable, { List } from 'immutable'

import Modal from '../components/modal/modal'
import FormProjectAdd from '../components/formProjectAdd'

import { projectDelete, projectActive, projectEdit } from '../actions'

class Nav extends Component {
    constructor() {
        super()

        this.state = {
            isModalOpen: false,
            editProjectIndex: null
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(nextProps.projects, this.props.projects) ||
            !Immutable.is(nextState, this.state)
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

    handleEdit(isOpen, projectIndex) {
        this.setState({
            isModalOpen: isOpen,
            editProjectIndex: projectIndex
        })
    }
    
    handleEditSubmit(projectName) {
        this.handleEdit(false, null)
        let { dispatch } = this.props
        let { editProjectIndex } = this.state
        dispatch(projectEdit(editProjectIndex, projectName))
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
                    <i className="iconfont nav-item-edit" title="修改"
                        onClick={ e => this.handleEdit(true, index) }>&#xe606;</i>
                    <i className="iconfont nav-item-del" title="删除"
                       onClick={ e => this.handleDelete(index) }>&#xe600;</i>
                </li>
            ))
        )

        let editProjectName = projects.getIn([this.state.editProjectIndex, 'projectName'])
        let modal = (
            <Modal
                clickAway={true}
                width={400}
                title="Edit project"
                isOpen={this.state.isModalOpen}
                buttons={{
                    'Edit Project': 'submit',
                    'Cancel': true
                }}
            >
                <FormProjectAdd
                    projectName={editProjectName}
                    onSubmit={this.handleEditSubmit}/>
            </Modal>
        )

        return (
            <div className="nav">
                <ul className="nav-list">
                    {lists(projects)}
                </ul>
                {modal}
            </div>
        )
    }
}

Nav.propTypes = {
    projects: PropTypes.instanceOf(Immutable.List).isRequired
}

export default connect()(Nav)