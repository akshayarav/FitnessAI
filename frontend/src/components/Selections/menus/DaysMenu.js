import React from 'react';

const DaysMenu=() => {
    return (
        <div>
            <h1>
                Days Per Week:
            </h1>
            <select id="days_per_week" placeholder="None">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
            </select>
        </div>

    )
}

export default DaysMenu