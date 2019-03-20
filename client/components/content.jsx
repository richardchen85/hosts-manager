import React, { Component, PropTypes } from 'react'
import CodeArea from './codeArea'

class Content extends Component {
    render() {
        let { projects } = this.props
        let content = this.props.global + '\n'

        projects.filter((project) => {
            return project.get('active')
        }).forEach((project) => {
            project.get('groups').filter((group) => {
                return group.get('active')
            }).forEach((group) => {
                content += group.get('content') + '\n'
            })
        })

        return (
            <div className="content">
                <CodeArea value={content} readonly="nocursor" />
            </div>
        )
    }
}

export default Content
