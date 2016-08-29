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
import Api from '../api'

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
                <Controls />
                <div className="main">
                    <Nav projects={projects} />
                    <GroupList project={currProject} projIndex={currIndex} />
                    <Content project={currProject} />
                </div>
            </div>
        )
    }
}

App.propTypes = {
    projects: PropTypes.instanceOf(Immutable.List).isRequired
}

function mapStateToProps(state) {
    return {
        projects: state.get('projects')
    }
}

export default connect(mapStateToProps)(App)