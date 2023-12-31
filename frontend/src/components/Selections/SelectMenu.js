import React from 'react'
import {GenerateMenu, GoalMenu, AgeMenu, GenderMenu, HeightMenu, WeightMenu, DifficultyMenu, DaysMenu} from './menus'
import Output from './menus/Output/output.js'
import './select.css'

const SelectMenu = () => {
    return (
        <div className = "select">
            <div className = "top">
            <div className = "instructions">
                <p> Welcome to FitnessAI! Enter values into to the fields below to get a custom AI generated workout plan that fits your needs.</p>
            </div>
                <div className = "options">
                    <div>
                        <AgeMenu /> 
                        <p></p>
                        <HeightMenu />
                        <p></p>
                        <DifficultyMenu />
                        <p></p>
                    </div>
                    <div>
                        <GenderMenu />
                        <p></p>
                        <WeightMenu />
                        <p></p>
                        <DaysMenu />
                    </div>
                </div>
                <div className = "goal">
                    <GoalMenu />
                </div>
            </div>
            
            <div className = "output">
                <Output />
            </div>
        </div>
    )
}

export default SelectMenu