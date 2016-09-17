import React, { Component, PropTypes } from 'react'
import Modal from './modal/modal'

export default class FormGlobal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.value
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit() {
        this.props.onSubmit(this.state.content)
    }

    handleChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        return (
            <form
                className="modal-global-form"
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        this.handleSubmit()
                    }
                }
            >
                <dl className="form-group form-group-inline">
                    <dt className="group-header">Content: </dt>
                    <dd className="group-control">
                        <textarea
                            autofocus
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

FormGlobal.propTypes = {
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}