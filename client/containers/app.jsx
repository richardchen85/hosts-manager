import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable, { Map, List } from 'immutable'

import Controls from './controls'
import Nav from './nav'
import GroupList from './groupList'
import Content from '../components/content'

import { initData } from '../actions'

class App extends Component {
    componentDidMount() {
        let { dispatch } = this.props

        dispatch(initData(Api.getData()))
    }

    render() {
        let { projects } = this.props
        let currProject = Map()
        let currIndex

        projects.forEach((project, index) => {
            if(project.get('active')) {
                currProject = project
                currIndex = index
                return false
            }
        })

        return (
            <div className="root">
                <Controls global={this.props.global} />
                <div className="main">
                    <Nav projects={projects} />
                    <GroupList project={currProject} projIndex={currIndex} key={currProject} />
                    <Content global={this.props.global} project={currProject} />
                </div>
            </div>
        )
    }
}

App.propTypes = {
    global: PropTypes.string.isRequired,
    projects: PropTypes.instanceOf(Immutable.List).isRequired
}

function mapStateToProps(state) {
    return {
        global: state.get('global'),
        projects: state.get('projects')
    }
}

export default connect(mapStateToProps)(App)