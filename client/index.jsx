import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Immutable from 'immutable'

import './components/fonts/iconfont.css'
import './components/css/style.css'

import App from './containers/app'
import reducer from './reducers'

function saveData({ getState }) {
    return (next) => (action) => {
        let before = getState().get('projects').toJS()

        let returnValue = next(action)

        let afterState = getState().toJS()
        let afterProjects = afterState.projects
        let afterContent = Api.getContent(afterProjects)

        if(Api.getContent(before) !== afterContent) {
            Api.saveData(afterContent)
        }
        
        Api.saveJSON(JSON.stringify(afterState))

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