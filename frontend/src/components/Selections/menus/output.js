import React, {useEffect, useState} from 'react'
import axios from 'axios'

const baseURL = process.env.REACT_APP_URL

export default function Output() {
  const [output, setOutput] = useState([])

  const fetchOutputs = async() => {
    axios.get(baseURL)
      .then(response => {
        try{
          setOutput(response.data.data[response.data.data.length-1].body)
          console.log(response.data.data[response.data.data.length-1].body)
        }
        catch (error) {
          console.log(error)
        }
      }, error => {
        console.log(error);
      });
    }
  
  useEffect(() => {
    fetchOutputs()
  })

  useEffect(() => {
    setOutput([])
  }, [])

  return (
    <p> {output} </p>
  )

}