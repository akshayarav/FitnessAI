import React from 'react'
import axios from 'axios'


function APISendRequest ({post}) {
    return (
        axios
        .post('baseUrl', post)
        .then(response => {
            console.log(response)
    })
    )
}

export default APISendRequest