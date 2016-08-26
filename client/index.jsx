import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './components/fonts/iconfont.css'
import './components/css/style.css'

import App from './containers/app'

render(
    <Provider className="root">
        <App />
    </Provider>,
    document.getElementById('root')
)