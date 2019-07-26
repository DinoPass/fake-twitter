import React from 'react'
import {NavLink} from "react-router-dom"
import axios from 'axios'

class UserNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followed: this.props.followed
        }
        this.followUser = this.followUser.bind(this)
        this.unFollowUser = this.unFollowUser.bind(this)
    }
    followUser() {
        axios.post('/follow', {
            followingId: this.props.followingId,
            userId: this.props.userId
        })
        .then(res => {
            if(res.status !== 200) {
                console.log('something went wrong')
            }
            console.log('followed user')
            this.setState({
                followed: true
            })
        })
    }
    unFollowUser() {
        axios.delete(`/follow?userId=${this.props.userId}&followingId=${this.props.followingId}`)
        .then(res => {
            if(res.status !== 200) {
                console.log('something went wrong')
            }
            console.log('unfollowed user')
            this.setState({
                followed: false
            })
        })
    }
    render() {
        const {numOfLikes, numOfFollowers, numOfFollowing, numOfPosts, userName} = this.props
        return (<nav>
           <NavLink to={`/${userName}`}><div>Posts {numOfPosts}</div></ NavLink>
           <NavLink to={`/${userName}/likes`}><div>Likes {numOfLikes}</div></ NavLink>
           <NavLink to={`/${userName}/followers`}><div>Followers {numOfFollowers}</div></ NavLink>
           <NavLink to={`/${userName}/following`}><div>Following {numOfFollowing}</div></ NavLink>
            { this.state.followed ? <button onClick={this.unFollowUser}>Following</button> 
            : <button onClick={this.followUser}>Follow</button> }
        </nav>)
    }
}

export default UserNav