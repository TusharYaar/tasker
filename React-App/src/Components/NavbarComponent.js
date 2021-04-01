import React from 'react';
import logo from '../logo.png';

const Navbar = () => {
    return (
        <div className="navbar w-full bg-yellow-900 h-15 py-3">
            <img alt="Site-Logo" className="" src={`${logo}`}/> 
        </div>
    )
}

export default Navbar;