import React from 'react'
import Post from '../Post'
import axios from 'axios'
import Tweet from '../Tweet'

class PostPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.updatePosts = this.updatePosts.bind(this)
        this.getAllPost = this.getAllPost.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.currentUserId !== this.props.currentUserId && this.props.currentUserId) {
            this.getAllPost()
        }
       
    }

    updatePosts(post) {
        this.setState((prevState) => {
            return {posts: prevState.posts.concat(post)}
        })
        this.props.increasePosts()
    }
    getAllPost() {
        console.log('getAllPosts2', this.props.currentUserId)
        
        axios.get(`/posts?type=multiple&limit=20&id=${this.props.currentUserId}`)
        .then(res => {
            console.log(res, 'this getAllPosts')
            if(res.status === 200) {
                this.setState({
                    posts: res.data
                })
            } 
        })
    }
    render() {
        console.log('post page rendered')
        return (<div> 
            {this.props.currentUserId === this.props.userId
                 ? <Tweet userId={this.props.currentUserId} updatePosts={this.updatePosts} /> : null}
            {this.state.posts.map((post) => {
            return <Post key={post._id} message={post.message} date={post.date} userName={this.props.userName} />
        })}</div>)
    }
}

export default PostPage