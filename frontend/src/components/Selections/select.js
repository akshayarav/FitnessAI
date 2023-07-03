import React from 'react'
import {GenerateMenu, GoalMenu, AgeMenu, GenderMenu, HeightMenu, WeightMenu, DifficultyMenu, DaysMenu} from './menus'
import Output from './menus/output.js'
import './index.css'

const SelectMenu = () => {
    return (
        <div>
            <div className = "top">
                <div className = "left">
                    <AgeMenu /> 
                    <p></p>
                    <HeightMenu />
                    <p></p>
                    <DifficultyMenu />
                </div>
                <div className = "right">
                    <GenderMenu />
                    <p></p>
                    <WeightMenu />
                    <p></p>
                    <DaysMenu />
                </div>
                <div className = "output">
                    <Output />
                </div>
            </div>
        <div className = "bottom">
            <GoalMenu />
            <p></p>
            <GenerateMenu />
        </div>
        </div>
    )
}

export default SelectMenu