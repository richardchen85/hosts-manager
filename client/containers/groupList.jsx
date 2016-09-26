import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import Modal from '../components/modal/modal'
import GroupItem from './groupItem'
import FormGroupAdd from '../components/formGroupAdd'
import { groupAdd } from '../actions'

class GroupList extends Component {
    constructor(props) {
        super(props)
        
        // this.state = {
        //     isModalOpen: false
        // }
        // this.showModal = this.showModal.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    // showModal(show) {
    //     this.setState({
    //         isModalOpen: show
    //     })
    // }
    
    // handleSubmit(groupName, content) {
    //     let { dispatch, projIndex } = this.props
    //     dispatch(groupAdd(projIndex, Immutable.fromJS({
    //         id: Date.now(),
    //         groupName,
    //         content,
    //         active: false,
    //         status: ''
    //     })))
    //     this.showModal(false)
    // }
    
    render() {
        let { groups, projIndex } = this.props

        return (
            <ul className="ls-list">
                {groups.map((group, index) => (
                    <GroupItem group={group} projIndex={projIndex} index={index} key={group} />
                ))}
            </ul>
        )
    }
}

export default connect()(GroupList)