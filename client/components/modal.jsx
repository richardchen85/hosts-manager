import React, { Component, PropTypes } from 'react'

export default class Modal extends Component {

    render() {
        let {
            title = '',
            btnSubmit = '',
            btnCancel,
            onSubmit,
            onCancel
        } = this.props

        let Footer = ({btnSubmit, btnCancel, onSubmit, onCancel}) => {
            if(!btnSubmit || !btnCancel) {
                return null
            }

            return (
                <footer className="footer">
                    <button type="button" className="dialog-btn" onClick={onSubmit}>
                        {btnSubmit}
                    </button>
                    <button type="button" className="dialog-btn" onClick={onCancel}>
                        {btnCancel}
                    </button>
                </footer>
            )
        }

        return (
            <div className="modal-container">
                <div className="mask"></div>
                <div className="dialog">
                    <header className="header">{title}</header>
                    <section className="cont">
                        {this.props.children}
                    </section>
                    <Footer {...this.props} />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    btnSubmit: PropTypes.string,
    btnCancel: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
}