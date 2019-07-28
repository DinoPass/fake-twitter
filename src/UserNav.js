import React from 'react'
import {NavLink} from "react-router-dom"
import axios from 'axios'

class UserNav extends React.Component {
    constructor(props) {
        super(props)
    
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
            this.props.addFollower()
        })
    }
    unFollowUser() {
        axios.delete(`/follow?userId=${this.props.userId}&followingId=${this.props.followingId}`)
        .then(res => {
            if(res.status !== 200) {
                console.log('something went wrong')
            }
            console.log('unfollowed user')
            this.props.removeFollower()
        })
    }
    render() {
        console.log('props', this.props.followed)
        const {numOfLikes, numOfFollowers, numOfFollowing, numOfPosts, userName} = this.props
        return (<nav>
           <NavLink to={`/${userName}`}><div>Posts {numOfPosts}</div></ NavLink>
           <NavLink to={`/${userName}/likes`}><div>Likes {numOfLikes}</div></ NavLink>
           <NavLink to={`/${userName}/followers`}><div>Followers {numOfFollowers}</div></ NavLink>
           <NavLink to={`/${userName}/following`}><div>Following {numOfFollowing}</div></ NavLink>
            { this.props.followed ? <button onClick={this.unFollowUser}>Following</button> 
            : <button onClick={this.followUser}>Follow</button> }
        </nav>)
    }
}

export default UserNav