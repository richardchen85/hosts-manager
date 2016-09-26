import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Modal from '../components/modal/modal'
import FormProjectAdd from '../components/formProjectAdd'
import FormGlobal from '../components/formGlobal'

function handleRefresh() {
    window.location.reload()
}

class ControlsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalNewProjVisible: false,
            modalGlobalVisible: false
        }
        this.setNewProjModal = this.setNewProjModal.bind(this)
        this.submitNewProj = this.submitNewProj.bind(this)
        this.setGlobalModal = this.setGlobalModal.bind(this)
        this.submitGlobal = this.submitGlobal.bind(this)
    }
    
    setNewProjModal(visible) {
        this.setState({
            modalNewProjVisible: visible
        })
    }
    
    submitNewProj(projectName) {
        this.setNewProjModal(false)
        this.props.submitNewProj(projectName)
    }

    setGlobalModal(visible) {
        this.setState({
            modalGlobalVisible: visible
        })
    }

    submitGlobal(content) {
        this.setGlobalModal(false)
        this.props.submitGlobal(content)
    }

    render() {
        let { modalNewProjVisible, modalGlobalVisible } = this.state
        return (
            <div className="controls">
                <ul className="ctrl-list">
                    <li className="ctrl-item" onClick={ e => this.setNewProjModal(true)}>
                        <i className="iconfont">&#xe601;</i>添加分组
                    </li>
                    <li className="ctrl-item" onClick={handleRefresh}>
                        <i className="iconfont">&#xe607;</i>刷新内容
                    </li>
                    <li className="ctrl-item" onClick={ e => this.setGlobalModal(true)}>
                        <i className="iconfont">&#xe60a;</i>全局配置
                    </li>
                    <li className="ctrl-item" id="importBtn">
                        <i className="iconfont">&#xe609;</i>导入配置
                    </li>
                    <li className="ctrl-item" id="exportBtn">
                        <i className="iconfont">&#xe608;</i>导出配置
                    </li>
                </ul>
                <FormProjectAdd
                    isOpen={modalNewProjVisible}
                    onClose={ e => this.setNewProjModal(false)}
                    onSubmit={this.submitNewProj}/>
                <FormGlobal
                    value={this.props.global}
                    isOpen={modalGlobalVisible}
                    onClose={e => this.setGlobalModal(false)}
                    onSubmit={this.submitGlobal}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        global: state.get('global')
    }
}

export default connect(mapStateToProps)(ControlsList)