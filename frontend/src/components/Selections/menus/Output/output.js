import React, { useContext } from 'react'
import { OutputContext } from '../../../../context/OutputContext';
import './output.css'

export default function Output() {
  const { output } = useContext(OutputContext);
  if (!output) return null  // render nothing if output is not available yet
  
  const plan = output.plan;
  console.log(plan)

  return (
    <div className="plan">
      <h1>Goal: <p>{plan.goal}</p></h1>
      <div>
        {Object.entries(plan.split).map(([day, details], index) => (
          <details key={index}>
            <summary>{day}: {details.name}</summary>
            <ul>
              {details.exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <h1>Tips: <p>{plan.tips}</p></h1>
    </div>
  );
}

