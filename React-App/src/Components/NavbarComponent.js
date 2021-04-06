import React from "react";
import logo from "../logo.png";
import { MdShortText } from "react-icons/md";
import {Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = ({ toggleSidebar,displayEvery }) => {
  const { currentUser } = useAuth();
  return (
    <div className="navbar w-full bg-indigo-600 h-16 py-3 px-3 flex flex-row justify-between fixed z-50">
      <div className="flex">
        {currentUser && !displayEvery ? <button onClick={toggleSidebar}>< MdShortText className="text-2xl md:hidden" /></button>:null}
        <Link to="/home"><img alt="Site-Logo" className="inline" src={`${logo}`} /></Link>
      </div>
      {currentUser ? <NavbarDropdown /> : null}
    </div>
  );
};

export default Navbar;
