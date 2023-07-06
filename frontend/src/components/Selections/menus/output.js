import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = process.env.REACT_APP_URL

export default function Output() {
  const [output, setOutput] = useState(null)

  const fetchOutputs = async () => {
    try {
      const response = await axios.get(baseURL)
      const outputData = JSON.parse(response.data.data[response.data.data.length - 1].body)
      setOutput(outputData)
      console.log(outputData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setOutput(null)
    fetchOutputs()
    const intervalId = setInterval(fetchOutputs, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [])


  if (!output) return null  // render nothing if output is not available yet
  
  

    const plan = output.plan;

    return (
        <div className="plan">
            <h1>Goal: {plan.goal}</h1>
            <h2>Split:</h2>
            {Object.entries(plan.split).map(([day, activity], index) => (
                <p key={index}>{day}: {activity}</p>
            ))}
            <p>Exercise Selection: {plan.exercise_selection}</p>
        </div>
    );
}
