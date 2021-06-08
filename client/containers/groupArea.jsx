import React, { Component } from 'react';
import { connect } from 'react-redux';

import GroupList from './groupList';
import FormGroupAdd from '../components/formGroupAdd';
import { groupAdd } from '../actions';

class GroupArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal(show) {
    this.setState({
      isModalOpen: show,
    });
  }

  handleSubmit(projIndex, groupName, content) {
    let { dispatch } = this.props;
    dispatch(
      groupAdd(projIndex, {
        groupName,
        content,
      }),
    );
    this.showModal(false);
  }

  render() {
    let { projects } = this.props;
    let { isModalOpen } = this.state;
    let activeProject, activeIndex;

    projects.forEach((project, index) => {
      if (project.get('active')) {
        activeProject = project;
        activeIndex = index;
        return false;
      }
    });

    if (!activeProject) {
      return <div className="list">no active project</div>;
    }

    let groups = activeProject.get('groups');

    return (
      <div className="list">
        <div className="ls-item-add" onClick={(e) => this.showModal(true)}>
          <i className="iconfont">&#xe601;</i>Add
        </div>
        <GroupList projIndex={activeIndex} groups={groups} />
        <FormGroupAdd
          projIndex={activeIndex}
          isOpen={isModalOpen}
          onClose={(e) => this.showModal(false)}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.get('projects'),
  };
}

export default connect(mapStateToProps)(GroupArea);
