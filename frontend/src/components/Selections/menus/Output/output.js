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
      <h1>Goal: {plan.goal}</h1>
      <div>
        {Object.entries(plan.split).map(([day, details], index) => (
          <div key={index}>
            <h2>{day}: {details.name}</h2>
            <ul>
              {details.exercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p>Tips: {plan.tips}</p>
    </div>
  );
}

