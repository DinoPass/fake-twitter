import React from 'react'

function Profile({avatar, userName, bio, createdAt}) {
    return (
        <div>
            <img src={avatar} width='400px' height='400px'/>
            <p>{userName}</p>
            <p>{bio}</p> 
            <p>{createdAt}</p>
        </div>
    )
}

export default Profile