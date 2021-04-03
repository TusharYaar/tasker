import React, {useState} from 'react';
import {useAuth} from "../Context/AuthContext";
import {useHistory,Link} from "react-router-dom";
import {MdKeyboardArrowDown,MdKeyboardArrowUp} from "react-icons/md"
const NavbarDropdown = ()=> {
  const history = useHistory();
  const {currentUser, signOut} = useAuth();
  const [dropdownVisible,toggleDropdown] = useState(false);
  const toggleDropdownState = () => {
    toggleDropdown(!dropdownVisible);
  }
  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      await signOut();
      history.push("/login");
    }
    catch {
      console.log("error");
    }
  }
    return (
        <div>
          <div>
    <button type="button" className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true" onClick={toggleDropdownState}>
      Options
      {dropdownVisible ? <MdKeyboardArrowUp className={`ml-2 text-xl`}/> : <MdKeyboardArrowDown className={`ml-2 text-xl`}/>}
    </button>
  </div>

  <div className={`origin-top-right absolute right-0 mt-2 mr-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform  ${dropdownVisible ? "opacity-100 scale-100"  :"opacity-0 scale-0"}`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    <div className="py-1" role="none">
      <div className="block px-4 py-2 text-sm text-gray-700" role="menuitem"><span>Logged in as: </span>
      <span>{currentUser.email}</span>
      </div>
      <Link to="/updateprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Update Profile</Link>
      <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">About</Link>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={handleSignOut}>
          Sign out
        </button>
    </div>
  </div>    
        </div>
    )
}

export default NavbarDropdown;
