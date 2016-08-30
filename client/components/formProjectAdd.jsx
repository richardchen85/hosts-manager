import React, { Component, PropTypes } from 'react'
import Modal from './modal/modal'

export default class FormProjectAdd extends Component {
    constructor() {
        super()

        this.state = {
            projectName: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit() {
        let projectName = this.state.projectName
        if(projectName === '') {
            Modal.open({
                width: 300,
                header: '信息提示',
                content: '项目名称不能为空！',
                buttons: {'确定': true}
            })
        } else {
            this.props.onSubmit(this.state.projectName)
        }
    }
    
    handleChange(e) {
        this.setState({
            projectName: e.target.value
        })
    }
    
    componentDidMount() {
        this.refs.projectName.focus()
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
                    <dt className="group-header">Project Name: </dt>
                    <dd className="group-control">
                        <input
                            ref="projectName"
                            type="text"
                            name="projectName"
                            autoComplete="off"
                            value={this.state.projectName}
                            onChange={this.handleChange} />
                    </dd>
                </dl>
            </form>
        )
    }
}

FormProjectAdd.propTypes = {
    onSubmit: PropTypes.func.isRequired
}