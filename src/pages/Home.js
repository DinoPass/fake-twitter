import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleChange(e, name) {
        this.setState({
            [name]: e.target.value
        })
    }
    handleLogin() {
        console.log(this.props)
        axios.post('/login', {
            username: this.state.userName,
            password: this.state.password 
        })
        .then((res) => {
            if(res.status !== 200) {
                throw new Error(res.data.message)
            }
            console.log(res.data)
            this.props.dispatch({type: 'USER_LOGIN', payload: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (<div>
            <input type='text' onChange={(e) => {this.handleChange(e, 'userName')}} />
            <input type='password' onChange={(e) => {this.handleChange(e, 'password')}} />
            <button onClick={this.handleLogin} >Login</button>
            <div>
                <Link to='/login'>Login</Link>

                <Link to='/signup'>Sign Up</Link>
            </div>
        </div>)
    }
}
const ReduxHome = connect()(Home)
export default ReduxHome