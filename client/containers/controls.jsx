import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import Modal from '../components/modal/modal'
import FormProjectAdd from '../components/formProjectAdd'
import FormGlobal from '../components/formGlobal'
import { projectAdd, globalSave } from '../actions'

function handleRefresh() {
    window.location.reload()
}

class Controls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
            isGlobalModalOpen: false
        }
        this.openModal = this.openModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeGlobalModal = this.changeGlobalModal.bind(this)
        this.globalSubmit = this.globalSubmit.bind(this)
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

    changeGlobalModal(open) {
        this.setState({
            isGlobalModalOpen: open
        })
    }

    globalSubmit(content) {
        this.changeGlobalModal(false)
        let { dispatch } = this.props
        dispatch(globalSave(content))
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

        let globalModal = (
            <Modal
                clickAway={true}
                width={400}
                title="Edit global hosts"
                isOpen={this.state.isGlobalModalOpen}
                buttons={{
                    'Save': 'submit',
                    'Cancel': true
                }}
            >
                <FormGlobal value={this.props.global} onSubmit={this.globalSubmit}/>
            </Modal>
        )
        return (
            <div className="controls">
                <ul className="ctrl-list">
                    <li className="ctrl-item" onClick={this.openModal}>
                        <i className="iconfont">&#xe601;</i>添加分组
                    </li>
                    <li className="ctrl-item" onClick={handleRefresh}>
                        <i className="iconfont">&#xe607;</i>刷新内容
                    </li>
                    <li className="ctrl-item" onClick={ e => this.changeGlobalModal(true)}>
                        <i className="iconfont">&#xe60a;</i>全局配置
                    </li>
                    <li className="ctrl-item" id="importBtn">
                        <i className="iconfont">&#xe609;</i>导入配置
                    </li>
                    <li className="ctrl-item" id="exportBtn">
                        <i className="iconfont">&#xe608;</i>导出配置
                    </li>
                </ul>
                {modal}
                {globalModal}
            </div>
        )
    }
}

Controls.propTypes = {
    global: PropTypes.string.isRequired
}

export default connect()(Controls)