import React, { Component } from 'react'
import { connect } from 'react-redux'

import ControlsList from '../components/controlsList'
import { projectAdd, globalSave } from '../actions'

class Controls extends Component {
    constructor(props) {
        super(props)

        this.submitNewProj = this.submitNewProj.bind(this)
        this.submitGlobal = this.submitGlobal.bind(this)
    }

    submitNewProj(projectName) {
        let { dispatch } = this.props
        dispatch(projectAdd(projectName))
    }

    submitGlobal(content) {
        let { dispatch } = this.props
        dispatch(globalSave(content))
    }

    render() {
        return (
            <ControlsList
                submitNewProj={this.submitNewProj}
                submitGlobal={this.submitGlobal} />
        )
    }
}

function mapStateToProps(state) {
    return { global: state.get('global') }
}

export default connect(mapStateToProps)(Controls)
