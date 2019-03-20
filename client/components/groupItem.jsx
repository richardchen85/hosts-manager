import React, { Component } from 'react'
import CodeArea from './codeArea'

function Header(props) {
    let { group, active, editing, index, toggleExpand, changeActive, changeStatus, handleDelete } = props
    return (
        <header className="header">
            <div className="arrow" onClick={ e => toggleExpand(index, !group.get('expand'))}/>
            <h3 className="title">
                <span onClick={ e => changeActive(!active, index) }>
                    <i className="iconfont i-no-check">&#xe604;</i>
                    <i className="iconfont i-checked">&#xe605;</i>
                    <em>{group.get('groupName')}</em>
                </span>
            </h3>
            <div className="ctrl">
                <i className="iconfont i-edit" title="modify"
                    onClick={ e => changeStatus(!editing, index) }>&#xe606;</i>
                <i className="iconfont i-del" title="delete"
                    onClick={e => handleDelete(index)}>&#xe600;</i>
            </div>
        </header>
    )
}

function Footer(props) {
    let { index, content } = props
    return (
        <footer className="ft">
            <span className="editing-btn-apply"
                onClick={e => props.handleSubmit(content, index)}>
                <i className="iconfont">&#xe603;</i>Apply</span>
            <span className="editing-btn-cancel"
                onClick={ e => props.changeStatus(false, index) }>
                <i className="iconfont">&#xe602;</i>Cancel</span>
        </footer>
    )
}

export default class GroupItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.group.get('content'),
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(content) {
        this.setState({
            content
        })
    }

    render() {
        let { group } = this.props
        let { content } = this.state

        let className = ['ls-item']
        let active = group.get('active')
        let editing = group.get('status') === 'editing'
        let expand = group.get('expand')

        active && className.push('checked')
        editing && className.push('editing')
        expand && className.push('expand')

        return (
            <li className={className.join(' ')}>
                <Header {...this.props} active={active} editing={editing} />
                <div className="code-wrap">
                    <CodeArea value={content} readonly={editing ? false : 'nocursor'} onChange={this.handleChange} />
                </div>
                <Footer {...this.props} content={content} />
            </li>
        )
    }
}
