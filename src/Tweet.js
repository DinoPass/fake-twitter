require('babel-polyfill')
import React from 'react'
import axios from 'axios'

class Tweet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendPosts = this.sendPosts.bind(this)
    }
    async sendPosts() {
        try {
            console.log('props', this.props)
            const response = await axios.post('/posts',
            { message: this.state.message,
              userId: this.props.userId
            })
            console.log(response.data) 
            if(this.props.updatePosts) {
            this.props.updatePosts(response.data)
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    render() {
        return (
            <div>
                <textarea onChange={this.handleChange}></textarea> 
                <button onClick={this.sendPosts}>Send</button>
            </div>
        )
    }
    
}

export default Tweet