import React from 'react'
import axios from 'axios'
import Follower from '../Follower'


class FollowingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            following: []
        }
        this.getFollowing = this.getFollowing.bind(this)
    }
    getFollowing() {
        console.log(this.props.currentUserId)
        axios.get(`/follow?type=following&userId=${this.props.currentUserId}`)
        .then((res) => {
            console.log('RESPONSE', res)
            if(res.status === 200) {
                this.setState({
                    following: res.data.following
                })
            }
        })
    }
    componentDidMount() {
        this.getFollowing()
    }
    render() {
        return ( <React.Fragment>
            
        { this.state.following.length > 0 ? this.state.following.map((follower) => {
            return <Follower key={follower._id} avatar={follower.avatar} username={follower.userName} />
        }) : null}
    </ React.Fragment> )
    }
}

export default FollowingPage