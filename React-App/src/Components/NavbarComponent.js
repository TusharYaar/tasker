import React from 'react';
import logo from '../logo.png';
import {useAuth} from "../Context/AuthContext"
 const Navbar = () => {
     const {currentUser} = useAuth();
    return (
        <div className="navbar w-full bg-indigo-600 h-16 py-3 px-3 flex flex-row justify-between">
            <img alt="Site-Logo" className="" src={`${logo}`}/> 
            {currentUser ? currentUser.uid : "Login"}
        </div>
    )
}

export default Navbar;