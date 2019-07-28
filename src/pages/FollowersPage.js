import React from 'react'
import axios from 'axios'
import Follower from '../Follower'


class FollowersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followers: []
        }
        this.getFollowers = this.getFollowers.bind(this)
    }
    getFollowers() {
        console.log(this.props.currentUserId)
        axios.get(`/follow?type=followers&userId=${this.props.currentUserId}`)
        .then((res) => {
            console.log('RESPONSE', res)
            if(res.status === 200) {
                this.setState({
                    followers: res.data.followers
                })
            }
        })

    }
    componentDidMount() {
        this.getFollowers()
    }
    render() {
        return ( <React.Fragment>
            
        { this.state.followers.length > 0 ? this.state.followers.map((follower) => {
            return <Follower key={follower._id} avatar={follower.avatar} username={follower.userName} />
        }) : null}
    </ React.Fragment> )
    }
}

export default FollowersPage