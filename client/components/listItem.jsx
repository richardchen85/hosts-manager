import React, { Component, PropTypes } from 'react'
import Immutable, { Map } from 'immutable'

import ContentEditable from './contenteditable'

export default class ListItem extends Component {
    
    render() {
        let { group, index } = this.props

        let className = 'ls-item'
        let active = group.get('active')
        let editing = (group.get('status') === 'editing')
        if(active) {
            className += ' checked'
        }
        if(editing) {
            className += ' editing'
        }

        return (
            <li className={className}>
                <header className="header">
                    <h3 className="title">
                        <i className="iconfont i-no-check" title="未选择">&#xe72f;</i>
                        <i className="iconfont i-checked" title="已选择">&#xe731;</i>
                        <span>1列表荐</span>
                    </h3>
                    <div className="ctrl">
                        <i className="iconfont i-edit" title="修改">&#xe738;</i>
                        <i className="iconfont i-del" title="删除">&#xe723;</i>
                    </div>
                </header>
                <ContentEditable
                    className="cont"
                    html={group.get('content')}
                    disabled={editing}
                    onChange={this.handleChange}
                />
                <footer className="ft">
                    <span className="editing-btn-apply"><i className="iconfont">&#xe72e;</i>应用</span>
                    <span className="editing-btn-cancel"><i className="iconfont">&#xe729;</i>取消</span>
                </footer>
            </li>
        )
    }
}

ListItem.propTypes = {
    group: PropTypes.instanceOf(Immutable.Map).isRequired,
    index: PropTypes.number.isRequired
}