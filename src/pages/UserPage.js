require('babel-polyfill')
import React from 'react'
import Post from '../Post'
import axios from 'axios'
import Profile from '../Profile'
import Tweet from '../Tweet'
import UserNav from '../UserNav'
import {connect} from 'react-redux'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            currentUser: {},
            message: '',
            numOfLikes: 0,
            numOfFollowers: 0,
            numOfFollowing: 0,
            numOfPosts: 0
        }
        this.getPosts = this.getPosts.bind(this)
        this.updatePosts = this.updatePosts.bind(this)
    }
    componentDidMount() {
        console.log(this.props)
        this.getPosts()
    }
    async getPosts() {
        try { 
        console.log(this.props)
        const response = await axios.get(`/user/${this.props.match.params.username}?userId=${this.props.user._id}`)
        console.log(response)
        const { posts, likes, followers, following, followed } = response.data
        this.setState({ posts, currentUser: response.data, numOfLikes: likes.length, numOfFollowers: followers.length, numOfFollowing: following.length, numOfPosts: posts.length }) 
        }
        catch(err) {
            console.log(err)
        }
    }
    updatePosts(post) {
        this.setState((prevState) => {
            return {posts: prevState.posts.concat(post), numOfPosts: prevState.numOfPosts +1}
        })
    }

    render() {
        return (
            <div>
                <UserNav userId={this.props.user._id} followed={this.state.currentUser.followed} followingId={this.state.currentUser._id} userName={this.state.currentUser.userName} numOfLikes={this.state.numOfLikes} numOfFollowers={this.state.numOfFollowers} numOfFollowing={this.state.numOfFollowing} numOfPosts={this.state.numOfPosts} />
                <Profile avatar={this.state.currentUser.avatar} bio={this.state.currentUser.bio} userName={this.state.currentUser.userName} createdAt={this.state.currentUser.createAt} />
                {this.state.currentUser._id === this.props.user._id ? <Tweet userId={this.state.currentUser._id} updatePosts={this.updatePosts} /> : null}
                {this.state.posts.map((post) => {
                    return <Post key={post._id} message={post.message} date={post.date} userName={this.state.currentUser.userName} />
                })}
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log('mapstatetoprops', state)
    return {
        user: state.user
    }
}
const ReduxUserPage = connect(mapStateToProps)(UserPage)
export default ReduxUserPage