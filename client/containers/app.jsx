import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Controls from './controls'
import Nav from './nav'
import GroupArea from './groupArea'

import { initData } from '../actions'

class App extends Component {
    componentDidMount() {
        let { dispatch } = this.props
        Api.getData().then(data => {
            dispatch(initData(data))
        }).catch(e => {
            alert(e)
        })
    }

    render() {
        return (
            <div className="root">
                <Controls />
                <div className="main">
                    <Nav />
                    <GroupArea />
                </div>
            </div>
        )
    }
}

export default connect()(App)