import React from 'react';
import Navbar from './Navbar';
const Structure = ({ children }) => {
    return (
    <React.Fragment>
        <div className="navigationWrapper">
            <Navbar />
            <main>{children}</main>
        </div>
    </React.Fragment>
    );
};
export default Structure;