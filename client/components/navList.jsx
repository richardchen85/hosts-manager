import React, { Component } from 'react'

export default class NavList extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const {
            projects,
            handleSelect,
            handleEdit,
            handleProjectOrder,
            handleDelete
        } = this.props

        const li = (project, index) => {
            const active = project.get('active') ? ' active' : ''
            return (
                <li className={"nav-item" + active} key={index}>
                    <span onClick={ e => handleSelect(index) }>
                        {project.get('projectName')}
                    </span>
                    <i className="iconfont nav-item-edit" title="修改"
                        onClick={ e => handleEdit(true, index) }>&#xe606;</i>
                    {index > 0 && 
                        <i className="iconfont nav-item-up" title="向上"
                            onClick={e => handleProjectOrder(index)}>&#xe60b;</i>
                    }
                    <i className="iconfont nav-item-del" title="删除"
                    onClick={ e => this.props.handleDelete(index) }>&#xe600;</i>
                </li>
            )
        }
        
        return (
            <ul className="nav-list">
                {projects.map(li)}
            </ul>
        )
    }
}