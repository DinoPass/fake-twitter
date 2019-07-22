
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import UserReducer from './reducer/UserReducer'
 
let store = createStore(UserReducer)
function ReduxApp() {
    return <Provider store={store}><App /></Provider>
}
ReactDOM.render(<ReduxApp />, document.getElementById('App'))