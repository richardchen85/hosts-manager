import React, { Component } from 'react'
import Modal from './modal/modal'

export default class FormProjectAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEdit: !!this.props.projectName,
            projectName: this.props.projectName || ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            isEdit: !!nextProps.projectName,
            projectName: nextProps.projectName || ''
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        
        let { projectName } = this.state
        if(projectName === '') {
            Modal.open({
                width: 300,
                header: '信息提示',
                content: '项目名称不能为空！',
                buttons: {'确定': true}
            })
        } else {
            this.props.onSubmit(projectName)
        }
    }
    
    handleClose() {
        this.setState({
            projectName: ''
        })
        this.props.onClose()
    }
    
    handleChange(e) {
        this.setState({
            projectName: e.target.value
        })
    }

    render() {
        let options = {
            clickAway: true,
            width: 400,
            title: this.state.isEdit ? 'Edit project' : 'Add new project',
            isOpen: this.props.isOpen,
            onClose: this.handleClose,
            buttons: {
                'Submit': 'submit',
                'Cancel': true
            }
        }
        
        const form = (
            <form className="modal-project-addnew" onSubmit={this.handleSubmit}>
                <dl className="form-group form-group-inline">
                    <dt className="group-header">Project Name: </dt>
                    <dd className="group-control">
                        <input
                            type="text"
                            autoComplete="off"
                            autoFocus
                            value={this.state.projectName}
                            onChange={this.handleChange} />
                    </dd>
                </dl>
            </form>
        )
        
        return Modal.makeModal(options, form)
    }
}