import React from 'react';
import './goal.css'
import GenerateMenu from '../GenerateMenu/GenerateMenu';

const GoalMenu=() => {
    return (
        <div className = "goal_menu">
            <div className = "goal_text">
                <h1>
                    Goal:
                </h1>
            </div>
            <input className = "goal_input" id = "goal" placeholder = "Gain weight">
            </input>
            <div className = "generate">
                <GenerateMenu />
            </div>
        </div>

    )
}

export default GoalMenu