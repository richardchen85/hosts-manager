import React, { Component, PropTypes } from 'react'

class Content extends Component {
    render() {
        let { projects } = this.props
        let content = this.props.global + '<br/>'
        
        projects.filter((project) => {
            return project.get('active')
        }).forEach((project) => {
            project.get('groups').filter((group) => {
                return group.get('active')
            }).forEach((group) => {
                content += group.get('content') + '<br/>'
            })
        })
        
        content = content.replace(/\r?\n/g, '<br/>')
        
        return (
            <div className="content">
                <div className="wrap" dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        )
    }
}

export default Content