import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import { projectAdd, projectDialogStatus } from '../actions'
import Modal from '../components/modal'

class AddProjectModal extends Component {

    constructor() {
        super()

        this.state = {
            title: 'add project',
            btnSubmit: 'Submit',
            btnCancel: 'Cancel',
            onSubmit: this.onSubmit.bind(this),
            data: {
                projectName: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    onSubmit(form) {
        let { dispatch } = this.props
        let { projectName } = this.state.data
        if('' === projectName) {
            alert('project name cat not be empty !')
            return
        }

        this.handleCancel()

        dispatch(projectAdd(Immutable.fromJS({
            id: '',
            projectName,
            active: false,
            groups: []
        })))
    }

    handleChange(elem) {
        this.setState({
            data: {
                [elem.getAttribute('name')]: elem.value
            }
        })
    }

    handleCancel() {
        let { dispatch } = this.props
        dispatch(projectDialogStatus(false))
    }
    
    render() {
        return (
            <Modal {...this.state} onCancel={this.handleCancel}>
                <dl className="form-group form-group-inline">
                    <dt className="group-header">Project Name: </dt>
                    <dd className="group-control">
                        <input
                            type="text"
                            name="projectName"
                            autoComplete="off"
                            onChange={e => this.handleChange(e.target)}
                            value={this.state.data.projectName} />
                    </dd>
                </dl>
            </Modal>
        )
    }
}

export default connect()(AddProjectModal)