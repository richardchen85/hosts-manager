import React, { Component } from 'react'
import { render } from 'react-dom'

import Controls from '../components/controls'
import Nav from '../components/nav'
import List from '../components/List'
import Content from '../components/content'
import Modal from '../components/modal'

export default class App extends Component {
    render() {
        return (
            <div className="root">
                <Controls />
                <div className="main">
                    <Nav />
                    <List />
                    <Content />
                </div>
                <Modal />
            </div>
        )
    }
}