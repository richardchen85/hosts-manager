import React, { Component, PropTypes } from 'react'

import Modal from '../components/modal'

export default class AddProjectModal extends Component {

    constructor() {
        super()

        this.state = {
            title: 'add project',
            btnSubmit :'Submit',
            btnCancel: 'Cancel',
            onSubmit: this.onSubmit.bind(this)
        }
    }

    onSubmit() {
        console.log(this.refs.projectName)
        this.props.onCancel()
    }
    
    render() {
        return (
            <Modal ref="modal" {...this.state} onCancel={this.props.onCancel}>
                <form className="modal-project-addnew" action="" method="post">
                    <dl className="form-group">
                        <dt className="group-header">Project Name: </dt>
                        <dd>
                            <input ref="projectName" type="text" name="projectName" />
                        </dd>
                    </dl>
                </form>
            </Modal>
        )
    }
}

AddProjectModal.propTypes = {
    onCancel: PropTypes.func.isRequired
}