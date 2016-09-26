import React, { Component } from 'react'

export default class NavList extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let { projects } = this.props
        let lists = (projects) => (
            projects.map((project, index) => (
                <li
                    className={"nav-item" + (project.get('active') ? ' active' : '')}
                    key={index}
                >
                    <span onClick={ e => this.props.handleSelect(index) }>
                        {project.get('projectName')}
                    </span>
                    <i className="iconfont nav-item-edit" title="修改"
                        onClick={ e => this.props.handleEdit(true, index) }>&#xe606;</i>
                    <i className="iconfont nav-item-del" title="删除"
                       onClick={ e => this.props.handleDelete(index) }>&#xe600;</i>
                </li>
            ))
        )
        
        return (
            <ul className="nav-list">
                {lists(projects)}
            </ul>
        )
    }
}