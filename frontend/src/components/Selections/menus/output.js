import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Output() {
  const [output, setOutput] = useState([])

  const fetchOutputs = async() => {
    const response = await fetch("http://localhost:8000/output")
    const outputs = await response.json()
    setOutput(outputs.data[outputs.data.length-1])
    }
  
  useEffect(() => {
    fetchOutputs()
  })

  useEffect(() => {
    setOutput([])
  }, [])


  return (
    <p> {output.body} </p>
  )
  }

export const Disable = async() => {
    var output = Output.output
    const response = await fetch("http://localhost:8000/output")
    const outputs = await response.json()
    if (outputs.data[outputs.data.length-1] != output){
    }
  }