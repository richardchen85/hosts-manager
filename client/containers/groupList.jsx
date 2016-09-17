import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import Modal from '../components/modal/modal'
import GroupItem from './groupItem'
import FormGroupAdd from '../components/formGroupAdd'
import { groupAdd } from '../actions'

class GroupList extends Component {
    constructor() {
        super()
        
        this.state = {
            isModalOpen: false
        }
        this.showModal = this.showModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(nextProps.project, this.props.project) || nextState.isModalOpen !== this.state.isModalOpen
    }
    
    showModal(show) {
        this.setState({
            isModalOpen: show
        })
    }
    
    handleSubmit(groupName, content) {
        let { dispatch, projIndex } = this.props
        dispatch(groupAdd(projIndex, Immutable.fromJS({
            id: Date.now(),
            groupName,
            content,
            active: false,
            status: ''
        })))
        this.showModal(false)
    }
    
    render() {
        let { project, projIndex } = this.props
        let groups = project.get('groups')

        let modal = (
            <Modal
                clickAway={true}
                width={400}
                title="Add new group"
                isOpen={this.state.isModalOpen}
                onClose={ e => this.showModal(false) }
                buttons={{
                    'Add Group': 'submit',
                    'Cancel': true
                }}
            >
                <FormGroupAdd onSubmit={this.handleSubmit}/>
            </Modal>
        )

        if(project.size === 0) {
            return <div className="list"></div>
        }

        return (
            <div className="list">
                <ul className="ls-list">
                    {groups && groups.map((group, index) => (
                        <GroupItem group={group} projIndex={projIndex} index={index} key={index} />
                    ))}
                </ul>
                <div className="ls-item-add" onClick={ e => this.showModal(true) }>
                    <i className="iconfont">&#xe601;</i>添加
                </div>
                {modal}
            </div>
        )
    }
}

GroupList.propTypes = {
    project: PropTypes.instanceOf(Immutable.Map).isRequired,
    projIndex: PropTypes.number
}

export default connect()(GroupList)