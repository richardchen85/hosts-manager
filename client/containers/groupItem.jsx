import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
    groupDelete,
    groupEditing,
    groupEdit,
    groupDeEdit,
    groupActive,
    groupDeActive
} from '../actions'

class GroupItem extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            content: this.props.group.get('content')
        }
        
        this.changeActive = this.changeActive.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    changeActive(active) {
        let { dispatch, projIndex, index } = this.props
        if(active) {
            dispatch(groupActive(projIndex, index))
        } else {
            dispatch(groupDeActive(projIndex, index))
        }
    }
    
    changeStatus(status) {
        let { dispatch, projIndex, index } = this.props
        if(status) {
            dispatch(groupEditing(projIndex, index))
        } else {
            dispatch(groupDeEdit(projIndex, index))
        }
    }
    
    handleSubmit() {
        let { content } = this.state
        let { dispatch, projIndex, index, group } = this.props
        dispatch(groupEdit(projIndex, index, group.set('content', content)))
        this.changeStatus(false)
    }
    
    handleDelete() {
        let { dispatch, projIndex, index } = this.props
        dispatch(groupDelete(projIndex, index))
    }
    
    handleChange(e) {
        this.setState({
            content: e.target.value
        })
    }
    
    render() {
        let { group, index } = this.props
        let { content } = this.state

        let className = ['ls-item']
        let active = group.get('active')
        let editing = group.get('status') === 'editing'
        active && className.push('checked')
        editing && className.push('editing')

        return (
            <li className={className.join(' ')}>
                <header className="header">
                    <h3 className="title">
                        <i className="iconfont i-no-check" title="未选择"
                            onClick={ e => this.changeActive(true) }>&#xe604;</i>
                        <i className="iconfont i-checked" title="已选择"
                            onClick={ e => this.changeActive(false) }>&#xe605;</i>
                        <span>({this.props.index + 1}) {group.get('groupName')}</span>
                    </h3>
                    <div className="ctrl">
                        <i className="iconfont i-edit" title="修改"
                            onClick={ e => this.changeStatus(true) }>&#xe606;</i>
                        <i className="iconfont i-del" title="删除"
                            onClick={this.handleDelete}>&#xe600;</i>
                    </div>
                </header>
                {
                    editing ?
                    <textarea
                        className="cont"
                        value={content}
                        onChange={this.handleChange}
                    /> : 
                    <div
                        className="cont"
                        dangerouslySetInnerHTML={{
                            __html: content.replace(/\r?\n/g, '<br/>')
                        }}
                    />
                }
                <footer className="ft">
                    <span className="editing-btn-apply"
                        onClick={this.handleSubmit}>
                        <i className="iconfont">&#xe603;</i>应用</span>
                    <span className="editing-btn-cancel"
                        onClick={ e => this.changeStatus(false) }>
                        <i className="iconfont">&#xe602;</i>取消</span>
                </footer>
            </li>
        )
    }
}

export default connect()(GroupItem)