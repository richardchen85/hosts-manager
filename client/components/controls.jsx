import React, { Component, PropTypes } from 'react'

export default class Controls extends Component {
    
    render() {
        let { onAddClick, onRefreshClick } = this.props
        return (
            <div className="controls">
                <ul className="ctrl-list">
                    <li className="ctrl-item" onClick={onAddClick}>
                        <i className="iconfont">&#xe727;</i>添加分组
                    </li>
                    <li className="ctrl-item" onClick={onRefreshClick}>
                        <i className="iconfont">&#xe782;</i>刷新内容
                    </li>
                </ul>
            </div>
        )
    }
}

Controls.propTypes = {
    onAddClick: PropTypes.func.isRequired,
    onRefreshClick: PropTypes.func.isRequired
}