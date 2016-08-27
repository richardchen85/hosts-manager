import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { List } from 'immutable'

import './components/fonts/iconfont.css'
import './components/css/style.css'

import App from './containers/app'

import reducer from './reducers'

let store = createStore(reducer)

render(
    <Provider className="root" store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)