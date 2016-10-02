import React, { Component } from 'react'

function Header(props) {
    let { group, index } = props
    return (
        <header className="header">
            <h3 className="title">
                <i className="iconfont i-no-check" title="未选择"
                    onClick={ e => props.changeActive(true, index) }>&#xe604;</i>
                <i className="iconfont i-checked" title="已选择"
                    onClick={ e => props.changeActive(false, index) }>&#xe605;</i>
                <span>({index + 1}) {group.get('groupName')}</span>
            </h3>
            <div className="ctrl">
                <i className="iconfont i-edit" title="修改"
                    onClick={ e => props.changeStatus(true, index) }>&#xe606;</i>
                <i className="iconfont i-del" title="删除"
                    onClick={e => props.handleDelete(index)}>&#xe600;</i>
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
                <i className="iconfont">&#xe603;</i>应用</span>
            <span className="editing-btn-cancel"
                onClick={ e => props.changeStatus(false, index) }>
                <i className="iconfont">&#xe602;</i>取消</span>
        </footer>
    )
}

export default class GroupItem extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            content: this.props.group.get('content')
        }
        
        this.handleChange = this.handleChange.bind(this)
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
        
        const textarea = <textarea
            className="cont"
            value={content}
            onChange={this.handleChange} />
        
        const contDiv = <div
            className="cont"
            dangerouslySetInnerHTML={{
                __html: content.replace(/\r?\n/g, '<br/>')
            }} />
        
        return (
            <li className={className.join(' ')}>
                <Header {...this.props} />
                { editing ? textarea : contDiv }
                <Footer {...this.props} content={content} />
            </li>
        )
    }
}