import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            signedUp: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }

    handleChange(e, name) {
        this.setState({
            [name]: e.target.value
        })
    }
    handleSignUp() {
        axios.post('/signup', {
            userName: this.state.userName,
            password: this.state.password 
        })
        .then((res) => {
            if(res.status !== 200) {
                throw new Error(res.data.message)
            }
            console.log(res.data)
            this.props.history.goBack()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (<div>
            <input type='text' onChange={(e) => {this.handleChange(e, 'userName')}} />
            <input type='password' onChange={(e) => {this.handleChange(e, 'password')}} />
            <button onClick={this.handleSignUp} >Sign Up</button>
        </div>)
    }
}

export default SignUp