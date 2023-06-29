import React from 'react'
import {GenerateMenu, FoodMenu, LiquorMenu, MixerMenu, AlcoholMenu, ServingsMenu, DifficultyMenu, HolidayMenu} from './menus'
import Output from './menus/output.js'
import './index.css'

const SelectMenu = () => {
    return (
        <div>
            <div className = "top">
                <div className = "left">
                    <LiquorMenu /> 
                    <p></p>
                    <AlcoholMenu />
                    <p></p>
                    <DifficultyMenu />
                </div>
                <div className = "right">
                    <MixerMenu />
                    <p></p>
                    <ServingsMenu />
                    <p></p>
                    <HolidayMenu />
                </div>
                <div className = "output">
                    <Output />
                </div>
            </div>
        <div className = "bottom">
                <FoodMenu />
                <GenerateMenu />
        </div>
        </div>
    )
}

export default SelectMenu