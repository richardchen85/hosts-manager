import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../components/modal/modal';
import FormProjectAdd from '../components/formProjectAdd';
import FormGlobal from '../components/formGlobal';
import Content from '../components/content';

function handleRefresh() {
  window.location.reload();
}

class ControlsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalNewProjVisible: false,
      modalGlobalVisible: false,
      modalPreviewVisible: false,
    };
    this.setNewProjModal = this.setNewProjModal.bind(this);
    this.submitNewProj = this.submitNewProj.bind(this);
    this.setGlobalModal = this.setGlobalModal.bind(this);
    this.submitGlobal = this.submitGlobal.bind(this);
    this.setPreviewVisible = this.setPreviewVisible.bind(this);
  }

  setNewProjModal(visible) {
    this.setState({
      modalNewProjVisible: visible,
    });
  }

  submitNewProj(projectName) {
    this.setNewProjModal(false);
    this.props.submitNewProj(projectName);
  }

  setGlobalModal(visible) {
    this.setState({
      modalGlobalVisible: visible,
    });
  }

  submitGlobal(content) {
    this.setGlobalModal(false);
    this.props.submitGlobal(content);
  }

  setPreviewVisible(visible) {
    this.setState({
      modalPreviewVisible: visible,
    });
  }

  render() {
    let { modalNewProjVisible, modalGlobalVisible, modalPreviewVisible } = this.state;
    let { global, projects } = this.props;

    let ctrlList = (
      <ul className="ctrl-list">
        <li className="ctrl-item" onClick={(e) => this.setNewProjModal(true)}>
          <i className="iconfont">&#xe601;</i>project
        </li>
        <li className="ctrl-item" onClick={handleRefresh}>
          <i className="iconfont">&#xe607;</i>refresh
        </li>
        <li className="ctrl-item" onClick={(e) => this.setGlobalModal(true)}>
          <i className="iconfont">&#xe60a;</i>global
        </li>
        <li className="ctrl-item" id="importBtn">
          <i className="iconfont">&#xe609;</i>import
        </li>
        <li className="ctrl-item" id="exportBtn">
          <i className="iconfont">&#xe608;</i>export
        </li>
        <li className="ctrl-item" onClick={(e) => this.setPreviewVisible(true)}>
          ◎ preview
        </li>
      </ul>
    );
    return (
      <div className="controls">
        {ctrlList}
        <FormProjectAdd
          isOpen={modalNewProjVisible}
          onClose={(e) => this.setNewProjModal(false)}
          onSubmit={this.submitNewProj}
        />
        <FormGlobal
          value={this.props.global}
          isOpen={modalGlobalVisible}
          onClose={(e) => this.setGlobalModal(false)}
          onSubmit={this.submitGlobal}
        />
        <Modal isOpen={modalPreviewVisible} onClose={(e) => this.setPreviewVisible(false)}>
          <Content global={global} projects={projects} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    global: state.get('global'),
    projects: state.get('projects'),
  };
}

export default connect(mapStateToProps)(ControlsList);
