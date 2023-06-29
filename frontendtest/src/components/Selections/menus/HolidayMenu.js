import React from 'react';

const HolidayMenu=() => {
    return (
        <div>
            <h1>
                Holiday:
            </h1>
            <select id="holiday" placeholder="None">
                <option>Any</option>
                <option>Christmas</option>
                <option>July 4th</option>
                <option>Custom</option>
            </select>
        </div>

    )
}

export default HolidayMenu