import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

function getActiveProject(projects) {
    let activeProjects = projects.filter((project) => {
        return project.get('active')
    })
    
    return activeProjects.get(0)
}

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

function mapStateToProps(state) {
    return {
        global: state.get('global'),
        projects: state.get('projects')
    }
}

export default connect(mapStateToProps)(Content)