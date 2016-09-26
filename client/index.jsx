import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Immutable from 'immutable'

import './components/fonts/iconfont.css'
import './components/css/style.css'

import App from './containers/app'
import reducer from './reducers'

// saveData middleware
// 当hosts数据改变时，写入hosts文件
function saveData({ getState }) {
    return (next) => (action) => {
        let before = getState().toJS()

        let returnValue = next(action)

        let afterState = getState().toJS()
        let afterContent = Api.getContent(afterState)

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
        global: "",
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