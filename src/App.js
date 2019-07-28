require('babel-polyfill')
import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import MainPage from './pages/MainPage'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.getUser = this.getUser.bind(this)
    }
    getUser(id) {
        // need to take id from document.cookie
        console.log('id: ', id)
        axios.get('/user?id=' + id)
        .then(res => {
            console.log(res, 'response from app.js')
            this.props.dispatch({
                type: 'USER_LOGIN',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        console.log('componentDidMount', document.cookie.slice(5))
        this.getUser(document.cookie.slice(5))
    }
    
    render() {
        console.log('cookie', document.cookie)
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' render={() => {
                            return this.props.loggedIn ? <MainPage /> : <Home /> 
                        }} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route path='/:username' component={UserPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}
const ReduxApp = connect(mapStateToProps)(App)
export default ReduxApp