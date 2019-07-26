import React from 'react'
import Profile from '../Profile'
import Tweet from '../Tweet'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class MainPage extends React.Component {
    
    render() {
        return (<div><Link to={`/${this.props.user.userName}`}>
        <Profile 
            avatar={this.props.user.avatar} 
            bio={this.props.user.bio} 
            userName={this.props.user.userName} 
            createdAt={this.props.user.createAt} 
        />
           </Link>
            <Tweet userId={this.props.user._id} />
        </div>)
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const ReduxMainPage = connect(mapStateToProps)(MainPage)
export default ReduxMainPage