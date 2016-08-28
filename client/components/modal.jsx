import React, { Component, PropTypes } from 'react'

export default class Modal extends Component {

    componentDidMount() {
        let {
            width = 400,
            height
        } = this.props
    }

    render() {
        let {
            width = 400,
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
                    <button type="submit" className="dialog-btn">
                        {btnSubmit}
                    </button>
                    <button type="button" className="dialog-btn" onClick={onCancel}>
                        {btnCancel}
                    </button>
                </footer>
            )
        }

        const style = {
            width: width + 'px'
        }

        return (
            <div className="modal-container">
                <div className="mask" onClick={onCancel}></div>
                <div className="dialog" style={style}>
                    <form
                        className="modal-project-addnew"
                        onSubmit={
                            (e) => {
                                e.preventDefault()
                                onSubmit(e.target)
                            }
                        }>
                        <header className="header">{title}</header>
                        <section className="cont">
                            {this.props.children}
                        </section>
                        <Footer {...this.props} />
                    </form>
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