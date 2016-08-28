import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { projectDialogStatus } from '../actions'

function handleRefresh() {
    window.location.reload()
}

class Controls extends Component {
    constructor() {
        super()

        this.handleDialogStatus = this.handleDialogStatus.bind(this)
    }

    handleDialogStatus() {
        let { dispatch } = this.props
        dispatch(projectDialogStatus(true))
    }

    render() {
        let { onAddClick } = this.props
        return (
            <div className="controls">
                <ul className="ctrl-list">
                    <li className="ctrl-item" onClick={this.handleDialogStatus}>
                        <i className="iconfont">&#xe727;</i>添加分组
                    </li>
                    <li className="ctrl-item" onClick={handleRefresh}>
                        <i className="iconfont">&#xe782;</i>刷新内容
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect()(Controls)