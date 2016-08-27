import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Immutable, { Map, List } from 'immutable'

import Controls from '../components/controls'
import Nav from '../components/nav'
import Lists from './list'
import Content from '../components/content'
import AddProjectModal from './addProjectModal'

import { initData } from '../actions'
import Api from '../api'

class App extends Component {

    constructor() {
        super()

        this.state = {
            showAddProjModal: false
        }
    }

    componentDidMount() {
        let dispatch = this.props.dispatch

        dispatch(initData(Api.getData()))
    }

    addProjectModalStatus(show) {
        this.setState({
            showAddProjModal: show
        })
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
                <Controls
                    onAddClick={e => this.addProjectModalStatus(true)}
                    onRefreshClick={ e => window.location.reload(true) } />
                <div className="main">
                    <Nav projects={projects} />
                    <Lists project={currProject} />
                    <Content project={currProject} />
                </div>
                {this.state.showAddProjModal ?
                    <AddProjectModal
                        onCancel={e => this.addProjectModalStatus(false)} /> : null
                }
            </div>
        )
    }
}

App.propTypes = {
    projects: PropTypes.instanceOf(Immutable.List).isRequired
}

function mapStateToProps(state = List()) {
    return {
        projects: state
    }
}

export default connect(mapStateToProps)(App)