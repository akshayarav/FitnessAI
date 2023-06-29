import React from 'react';

const DifficultyMenu=() => {
    return (
        <div>
            <h1>
                Difficulty:
            </h1>
            <select id="difficulty">
                <option>Any</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>
        </div>

    )
}

export default DifficultyMenu