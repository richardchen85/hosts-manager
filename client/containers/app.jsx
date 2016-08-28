import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable, { Map, List } from 'immutable'

import Controls from './controls'
import Nav from './nav'
import GroupList from './groupList'
import Content from '../components/content'
import AddProjectModal from './addProjectModal'

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

        projects.forEach((project) => {
            if(project.get('active')) {
                currProject = project
                return false
            }
        })

        return (
            <div className="root">
                <Controls />
                <div className="main">
                    <Nav projects={projects} />
                    <GroupList project={currProject} />
                    <Content project={currProject} />
                </div>
                {this.props.showAddProjModal ?
                    <AddProjectModal /> : null
                }
            </div>
        )
    }
}

App.propTypes = {
    projects: PropTypes.instanceOf(Immutable.List).isRequired,
    showAddProjModal: PropTypes.any
}

function mapStateToProps(state) {
    return {
        projects: state.get('projects'),
        showAddProjModal: state.get('showAddProjModal')
    }
}

export default connect(mapStateToProps)(App)