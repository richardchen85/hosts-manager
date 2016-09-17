import React, { Component, PropTypes } from 'react'
import Immutable, { List } from 'immutable'

export default class Content extends Component {

    shouldComponentUpdate(nextProps, netxtState) {
        return !Immutable.is(nextProps.project, this.props.project)
    }

    render() {
        let { project } = this.props
        let groups = project.size > 0 && project.get('groups').filter((group) => {
            return group.get('active')
        })

        let content = this.props.global + '<br/>'
        groups && groups.map((group) => {
            content += group.get('content') + '<br/>'
        })
        content = content.replace(/\r?\n/g, '<br/>')
        return (
            <div className="content">
                <div className="wrap" dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        )
    }
}

Content.propTypes = {
    global: PropTypes.string.isRequired,
    project: PropTypes.instanceOf(Immutable.Map).isRequired
}