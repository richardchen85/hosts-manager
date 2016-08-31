import React, { Component, PropTypes } from 'react'
import Modal from './modal/modal'

export default class FormGroupAdd extends Component {
    constructor() {
        super()

        this.state = {
            groupName: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit() {
        let { groupName, content } = this.state
        if(groupName === '') {
            Modal.alert('Group name can not be empty !')
        } else if(content === '') {
            Modal.alert('Group content can not be empty !')
        } else {
            this.props.onSubmit(groupName, content)
        }
    }
    
    handleChange(e) {
        this.setState({
            [e.target.getAttribute('name')]: e.target.value
        })
    }
    
    componentDidMount() {
        this.refs.groupName.focus()
    }

    render() {
        return (
            <form
                className="modal-project-addnew"
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        this.handleSubmit()
                    }
                }
            >
                <dl className="form-group form-group-inline">
                    <dt className="group-header">Group Name: </dt>
                    <dd className="group-control">
                        <input
                            ref="groupName"
                            type="text"
                            name="groupName"
                            autoComplete="off"
                            value={this.state.groupName}
                            onChange={this.handleChange} />
                    </dd>
                </dl>
                <dl className="form-group form-group-inline">
                    <dt className="group-header">Content: </dt>
                    <dd className="group-control">
                        <textarea
                            className="content"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange} />
                    </dd>
                </dl>
            </form>
        )
    }
}

FormGroupAdd.propTypes = {
    onSubmit: PropTypes.func.isRequired
}