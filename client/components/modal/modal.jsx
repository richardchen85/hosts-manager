import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import PubSub from './PubSub'

const MODAL_ADD = 'MODAL_ADD'
const MODAL_DEL = 'MODAL_DEL'
const CLICK_AWAY = 'CLICK_AWAY'
const Z_INDEX = 1100

let uid = Date.now()
let modals = []
let modalContainer

function nextUid() {
    return (uid++).toString(36)
}

class ModalContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            increase: false,
            modals
        }
        this.close = this.close.bind(this)
        this.clickAway = this.clickAway.bind(this)
        this.elements = {}
    }

    componentDidMount() {
        PubSub.subscribe(MODAL_ADD, this.modalAdd.bind(this))
        PubSub.subscribe(MODAL_DEL, this.modalDel.bind(this))
        PubSub.subscribe(CLICK_AWAY, () => {
            let props = modals[modals.length - 1]
            if(props.clickAway) {
                PubSub.publish(MODAL_DEL)
            }
        })
    }

    modalAdd(props) {
        let isReplace = false
        modals = modals.map((modal) => {
            if(modal.id === props.id) {
                isReplace = true
                modal = props
            }
            return modal
        })

        if(!isReplace) {
            modals.push(props)
        }

        this.setState({
            modals,
            increase: true
        })

        document.body.style.height = '100%'
        document.body.style.overflow = 'hidden'
    }

    modalDel(id) {
        let props
        if(!id) {
            props = modals.pop()
        } else {
            modals.forEach((modal, index) => {
                if(modal.id === id) {
                    props = modals.splice(i, 1)
                }
            })
        }

        if(!props) {
            return
        }

        if(props.onClose) {
            props.onClose()
        }

        this.setState({
            modals,
            increase: false
        })

        if(modals.length === 0) {
            document.body.style.height = ''
            document.body.style.overflow = ''
        }
    }

    close() {
        PubSub.publish(MODAL_DEL)
    }

    clickAway(event) {
        if(event.target.className === 'modal-inner') {
            event.stopPropagation()
            PubSub.publish(CLICK_AWAY)
        }
    }

    renderModals() {
        return this.state.modals.map((options, index) => {
            let style = {
                width: options.width || 500
            }

            let header, buttons = []
            if(options.header) {
                header = <div className="header">{options.header}</div>
            }

            if(options.buttons) {
                buttons = Object.keys(options.buttons).map((button, index) => {
                    let func = options.buttons[button],
                        status = index === 0 ? 'primary' : '',
                        handle = () => {
                            if(func === true) {
                                this.close()
                            } else if (func === 'submit') {
                                let form = this.elements[options.id].querySelector('form')
                                if(form) {
                                    let event
                                    if(CustomEvent) {
                                        event = new CustomEvent('submit', { bubbles: true, cancelable: true })
                                    } else {
                                        event = document.createEvent('HTMLEvents')
                                        event.initEvent('submit', true, true)
                                    }
                                    form.dispatchEvent(event)
                                }
                            } else {
                                if(func()) {
                                    this.close()
                                }
                            }
                        }

                    return <button className="dialog-btn" data-status={status} key={index} onClick={handle}>{button}</button>
                })
            }

            const clickAway = options.clickAway ? this.clickAway : undefined

            return (
                <div
                    ref={(el) => this.elements[options.id] = el}
                    className="modal-inner"
                    onClick={clickAway}
                    style={{zIndex: Z_INDEX + index}}
                    key={options.id}
                >
                    <div className="dialog" style={style}>
                        <a className="dialog-close" onClick={this.close.bind(this, true)}>
                            <i className="iconfont">&#xe600;</i>
                        </a>
                        {header}
                        <div className="cont">
                            {options.content}
                        </div>
                        {
                            buttons.length > 0 &&
                            <div className="footer">
                                {buttons}
                            </div>
                        }
                    </div>
                </div>
            )
        })
    }

    render() {
        let len = this.state.modals.length
        let className = 'modal-container' + (len > 0 ? ' active' : '')

        return (
            <div className={className} style={{zIndex: Z_INDEX}}>
                <div className={'mask' + (len > 0 ? ' active' : '')} style={{zIndex: Z_INDEX + len - 1}}/>
                { this.renderModals() }
            </div>
        )
    }
}

/**
 * static methods
 * ================================================
 */

function close(id) {
    PubSub.publish(MODAL_DEL, id)
}

function open(options) {
    if(!options.id) {
        options.id = nextUid()
    }

    if(!modalContainer) {
        createContainer(() => {
            PubSub.publish(MODAL_ADD, options)
        })
    } else {
        PubSub.publish(MODAL_ADD, options)
    }

    return options.id
}

function alert(content, header = <span>&nbsp;</span>) {
    let buttons = {}
    buttons['OK'] = true

    return open({
        clickAway: false,
        content,
        header,
        buttons
    })
}

function confirm(content, callback, header = <span>&nbsp;</span>) {
    let buttons = {}

    buttons['OK'] = () => {
        callback()
        return true
    }
    buttons['Cancel'] = true

    return open({
        clickAway: false,
        content,
        header,
        buttons
    })
}

function createContainer(callback) {
    modalContainer = document.createElement('div')
    document.body.appendChild(modalContainer)
    render(<ModalContainer />, modalContainer, () => callback())
}

function makeModal(options, component) {
    return <Modal {...options}>{component}</Modal>
}

/**
 * modal
 * ================================================
 */

class Modal extends Component {
    constructor(props) {
        super(props)
        this.id = nextUid()
    }

    componentDidMount() {
        if(this.props.isOpen) {
            this.renderModal(this.props)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.isOpen && !this.props.isOpen) {
            return
        }

        if(nextProps.isOpen) {
            this.renderModal(nextProps)
        } else {
            close()
        }
    }

    renderModal(props) {
        let options = {
            id: this.id,
            content: props.children,
            header: props.title
        }
        for(let prop in props) {
            if(props.hasOwnProperty(prop)) {
                options[prop] = props[prop]
            }
        }
        open(options)
    }

    render() {
        return null
    }
}

Modal.propTypes = {
    buttons: PropTypes.object,
    children: PropTypes.any,
    isOpen: PropTypes.bool,
    noPadding: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    width: PropTypes.number,
    clickAway: PropTypes.bool
};

Modal.open = open;
Modal.alert = alert;
Modal.confirm = confirm;
Modal.close = close;
Modal.makeModal = makeModal;

module.exports = Modal;
