import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import Modal from '../components/modal/modal'
import FormProjectAdd from '../components/formProjectAdd'
import { projectAdd } from '../actions'

function handleRefresh() {
    window.location.reload()
}

class Controls extends Component {
    constructor() {
        super()

        this.state = {
            isModalOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    openModal() {
        this.setState({
            isModalOpen: true
        })
    }
    
    closeModal() {
        this.setState({
            isModalOpen: false
        })
    }
    
    handleSubmit(projectName) {
        this.closeModal()
        let { dispatch } = this.props
        dispatch(projectAdd(Immutable.fromJS({
            id: Date.now(),
            projectName,
            active: false,
            groups: []
        })))
    }

    render() {
        let modal = (
            <Modal
                clickAway={true}
                width={400}
                title="Add new project"
                isOpen={this.state.isModalOpen}
                buttons={{
                    'Add Project': 'submit',
                    'Cancel': true
                }}
            >
                <FormProjectAdd onSubmit={this.handleSubmit}/>
            </Modal>
        )
        return (
            <div className="controls">
                <ul className="ctrl-list">
                    <li className="ctrl-item" onClick={this.openModal}>
                        <i className="iconfont">&#xe727;</i>添加分组
                    </li>
                    <li className="ctrl-item" onClick={handleRefresh}>
                        <i className="iconfont">&#xe782;</i>刷新内容
                    </li>
                </ul>
                {modal}
            </div>
        )
    }
}

export default connect()(Controls)