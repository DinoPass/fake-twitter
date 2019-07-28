require('babel-polyfill')
import React from 'react'
import axios from 'axios'
import Profile from '../Profile'
import Tweet from '../Tweet'
import UserNav from '../UserNav'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router'
import FollowersPage from './FollowersPage'
import FollowingPage from './FollowingPage'
import PostPage from './PostPage'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            message: '',
            numOfLikes: 0,
            numOfFollowers: 0,
            numOfFollowing: 0,
            numOfPosts: 0,
            followed: false
        }
        this.addFollower = this.addFollower.bind(this)
        this.removeFollower = this.removeFollower.bind(this)
        this.increasePosts = this.increasePosts.bind(this)
        this.getUser = this.getUser.bind(this)
    }
    componentDidMount() {
        console.log(this.props)
        this.getUser()
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('component updated', prevProps, this.props)
        if(this.props.loggedIn !== prevProps.loggedIn) {
            this.getUser()
        }
    }
    async getUser() {
        try { 
        console.log(this.props)
        const response = await axios.get(`/user/${this.props.match.params.username}?userId=${this.props.user ? this.props.user._id : null}`)
        const { user, followed } = response.data 
        const { likes, followers, following, posts } = user
        console.log(followed)
        this.setState({ followed, currentUser: user, numOfLikes: likes.length, numOfFollowers: followers.length, numOfFollowing: following.length, numOfPosts: posts.length }) 
        }
        catch(err) {
            console.log(err)
        }
    }
   
    addFollower() {
        this.setState(prevState => ({
            followed: true,
            numOfFollowers: prevState.numOfFollowers +1
        }))
    }
    removeFollower() {
        this.setState(prevState => ({
            followed: false,
            numOfFollowers: prevState.numOfFollowers -1
        }))
    }

    increasePosts() {
        this.setState(
            prevState => ({
                numOfPosts: prevState.numOfPosts+1
            }) 
        )
    }
    
    render() {
        return (
            <div>
                <UserNav 
                addFollower={this.addFollower} 
                removeFollower={this.removeFollower} 
                userId={this.props.user ? this.props.user._id : null } 
                followed={this.state.followed} 
                followingId={this.state.currentUser._id} 
                userName={this.state.currentUser.userName} 
                numOfLikes={this.state.numOfLikes} 
                numOfFollowers={this.state.numOfFollowers} 
                numOfFollowing={this.state.numOfFollowing} 
                numOfPosts={this.state.numOfPosts} />
                <Profile 
                avatar={this.state.currentUser.avatar} 
                bio={this.state.currentUser.bio} 
                userName={this.state.currentUser.userName} 
                createdAt={this.state.currentUser.createAt} />
                
                   <Switch>
                    <Route path={`/${this.props.match.params.username}/followers`} render={({match}) => {
                        return <FollowersPage currentUserId={this.state.currentUser._id} />
                    }} />
                    <Route path={`/${this.props.match.params.username}/following`} render={({match}) => {
                        return <FollowingPage currentUserId={this.state.currentUser._id} />
                    }} />
                     <Route exact path={`/${this.props.match.params.username}`} render={({match}) => {
                        console.log(this.state.currentUser, 'routes for postPage')
                        return <PostPage userId={this.props.user ? this.props.user._id : null} currentUserId={this.state.currentUser._id} increasePosts={this.increasePosts} userName={this.state.currentUser.userName} />
                    }} />
                   </Switch>
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log('mapstatetoprops', state)
    return {
        user: state.user,
        loggedIn: state.loggedIn
    }
}
const ReduxUserPage = connect(mapStateToProps)(UserPage)
export default ReduxUserPage