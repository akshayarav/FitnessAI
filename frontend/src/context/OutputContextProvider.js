import React, { useState } from 'react';
import { OutputContext } from './OutputContext';

export const OutputContextProvider = ({ children }) => {
    const [output, setOutput] = useState(null);

    return (
        <OutputContext.Provider value={{ output, setOutput }}>
            {children}
        </OutputContext.Provider>
    );
};
