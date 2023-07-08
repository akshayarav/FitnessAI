import React, { useContext } from 'react'
import { OutputContext } from '../../../../context/OutputContext';

export default function Output(props) {
  const { output } = useContext(OutputContext);
  if (!output) return null  // render nothing if output is not available yet
  
  const plan = output.plan;
  console.log("PLAN SET")
  console.log(plan)

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
