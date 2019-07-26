import React from 'react'

function Post({userName, date, message}) {
    return (
        <div>
            <h3>{userName}</h3>
            <h6>{date}</h6>
            <p>{message}</p>
        </div>
    )
}
export default Post