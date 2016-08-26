import React, { Component } from 'react'

export default class Controls extends Component {
    
    render() {
        return (
            <div className="controls">
                <ul className="ctrl-list">
                    <li className="ctrl-item"><i className="iconfont">&#xe727;</i>添加分组</li>
                    <li className="ctrl-item"><i className="iconfont">&#xe782;</i>刷新内容</li>
                </ul>
            </div>
        )
    }
}