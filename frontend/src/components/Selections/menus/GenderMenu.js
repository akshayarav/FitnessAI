import React from 'react';

const GenderMenu=() => {
    return (
        <div>
            <h1>
                Gender:
            </h1>
            <select id="gender" placeholder="None">
                <option>None</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>

    )
}

export default GenderMenu