import React from 'react'
import axios from 'axios'

function APISendRequest ({post}) {
    return (
        axios
        .post('http://localhost:3001/posts', post)
        .then(response => {
            console.log(response)
    })
    )
}

export default APISendRequest