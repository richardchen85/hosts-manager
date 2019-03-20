import React, { Component, PropTypes } from 'react'
import Modal from './modal/modal'
import CodeArea from './codeArea'

export default class FormGroupAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groupName: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        let { groupName, content } = this.state
        if(groupName === '') {
            Modal.alert('Group name can not be empty !')
        } else if(content === '') {
            Modal.alert('Group content can not be empty !')
        } else {
            this.props.onSubmit(this.props.projIndex, groupName, content)
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.getAttribute('name')]: e.target.value
        })
    }

    handleClose() {
        this.setState({
            groupName: '',
            content: ''
        })
        this.props.onClose()
    }

    handleContentChange(value) {
        this.setState({
            content: value
        })
    }

    render() {
        let options = {
            clickAway: true,
            width: 570,
            title: "add new group",
            isOpen: this.props.isOpen,
            onClose: this.handleClose,
            buttons: {
                'Confirm': 'submit',
                'Cancel': true
            }
        }

        let form = (
            <form
                ref="formAddGroup"
                className="modal-group-addnew"
                onSubmit={this.handleSubmit}>
                <dl className="form-group form-group-inline">
                    <dt className="group-header">group name: </dt>
                    <dd className="group-control">
                        <input
                            type="text"
                            name="groupName"
                            autoComplete="off"
                            autoFocus
                            value={this.state.groupName}
                            onChange={this.handleChange} />
                    </dd>
                </dl>
                <dl className="form-group form-group-inline">
                    <dt className="group-header">content: </dt>
                    <dd className="group-control">
                        <CodeArea
                            value={this.state.content}
                            readonly={false}
                            onChange={this.handleContentChange} />
                    </dd>
                </dl>
            </form>
        )

        return Modal.makeModal(options, form)
    }
}
