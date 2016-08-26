import React, { Component } from 'react'

export default class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <span>项目分组</span>
                        <i className="iconfont nav-item-del" title="删除">&#xe723;</i>
                    </li>
                    <li className="nav-item">
                        <span>项目分组</span>
                        <i className="iconfont nav-item-del" title="删除">&#xe723;</i>
                    </li>
                    <li className="nav-item active">
                        <span>项目分组</span>
                        <i className="iconfont nav-item-del" title="删除">&#xe723;</i>
                    </li>
                    <li className="nav-item">
                        <span>项目分组</span>
                        <i className="iconfont nav-item-del" title="删除">&#xe723;</i>
                    </li>
                </ul>
            </div>
        )
    }
}