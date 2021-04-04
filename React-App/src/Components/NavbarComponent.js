import React from "react";
import logo from "../logo.png";
import { MdShortText } from "react-icons/md";

import { useAuth } from "../Context/AuthContext";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = ({ toggleSidebar,displayEvery }) => {
  const { currentUser } = useAuth();
  return (
    <div className="navbar w-full bg-indigo-600 h-16 py-3 px-3 flex flex-row justify-between fixed">
      <div className="flex">
        {currentUser ? <button onClick={toggleSidebar}>< MdShortText className="text-2xl md:hidden" /></button>:null}
        <img alt="Site-Logo" className={`${displayEvery ? "inline" : "hidden sm:inline"}`} src={`${logo}`} />
      </div>
      {currentUser ? <NavbarDropdown /> : null}
    </div>
  );
};

export default Navbar;
