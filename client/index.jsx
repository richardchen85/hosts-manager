import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Immutable from 'immutable'

import './components/fonts/iconfont.css'
import './components/css/style.css'

import App from './containers/app'
import reducer from './reducers'
import Api from './api'

function saveData({ getState }) {
    return (next) => (action) => {
        let before = Api.getContent(getState().get('projects').toJS())

        let returnValue = next(action)

        let after = Api.getContent(getState().get('projects').toJS())

        if(before !== after) {
            Api.saveData(after)
        }

        return returnValue
    }
}

let store = createStore(
    reducer,
    Immutable.fromJS({
        projects: []
    }),
    applyMiddleware(saveData)
)

render(
    <Provider className="root" store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)