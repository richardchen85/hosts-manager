import React, { Component, PropTypes } from 'react'
import Modal from './modal/modal'
import CodeArea from './codeArea'

export default class FormGlobal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.value
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            content: nextProps.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        
        this.props.onSubmit(this.state.content)
    }
    
    handleClose() {
        this.setState({
            content: ''
        })
        this.props.onClose()
    }

    handleChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    handleContentChange(content) {
        this.setState({ content })
    }

    render() {
        let options = {
            width: 400,
            title: 'global hosts',
            isOpen: this.props.isOpen,
            onClose: this.handleClose,
            buttons: {
                'Save': 'submit',
                'Cancel': true
            }
        }
        
        let form = (
            <form className="modal-global-form" onSubmit={this.handleSubmit}>
                <dl className="form-group">
                    <dd className="group-control">
                        <CodeArea value={this.state.content} onChange={this.handleContentChange}/>
                    </dd>
                </dl>
            </form>
        )
        
        return Modal.makeModal(options, form)
    }
}