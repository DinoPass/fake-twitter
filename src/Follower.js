import React from 'react'
import {Link} from 'react-router-dom'

function Follower(props) {
    return (
        <a href={`/${props.username}`} >
        <div><img src={props.avatar} height={100} />
            <h3>{props.username}</h3>
        </div>
        </a>
        )
}

export default Follower