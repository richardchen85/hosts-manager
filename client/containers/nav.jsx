import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavList from '../components/navList'
import FormProjectAdd from '../components/formProjectAdd'

import { projectDelete, projectActive, projectEdit, projectOrder } from '../actions'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            editProjectIndex: null
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.handleProjectOrder = this.handleProjectOrder.bind(this)
    }
    
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
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
            modalVisible: isOpen,
            editProjectIndex: projectIndex
        })
    }
    
    handleEditSubmit(projectName) {
        this.handleEdit(false, null)
        let { dispatch } = this.props
        let { editProjectIndex } = this.state
        dispatch(projectEdit(editProjectIndex, projectName))
    }

    handleProjectOrder(index) {
        let { dispatch } = this.props
        dispatch(projectOrder(index))
    }

    render() {
        let { projects } = this.props
        let editProjectName = projects.getIn([this.state.editProjectIndex, 'projectName'])

        return (
            <div className="nav">
                <NavList
                    projects={projects}
                    handleSelect={this.handleSelect}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    handleProjectOrder={this.handleProjectOrder}/>
                <FormProjectAdd
                    isOpen={this.state.modalVisible}
                    onClose={e => this.setModalVisible(false)}
                    projectName={editProjectName}
                    onSubmit={this.handleEditSubmit}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        projects: state.get('projects')
    }
}

export default connect(mapStateToProps)(Nav)