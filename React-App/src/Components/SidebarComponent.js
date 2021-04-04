import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../logo.png";
import { MdAdd } from "react-icons/md";
// import {useAuth } from "../Context/AuthContext"
const Sidebar = ({ projects ,sidebarVisible}) => {
  // const {currentUser} = useAuth();
  const projectLinks = projects.map((project) => {
    return (
      <NavLink
        className="my-2 text-lg tracking-widest  "
        exact={true}
        activeClassName="font-bold"
        key={project.id}
        to={`/${project.id}`}
      >
        {project.projectName}
      </NavLink>
    );
  });
 

  
  return (
    <div className={`mt-16 ${sidebarVisible? "w-52" : "w-0"} transition-all duration-500 md:w-60 h-full bg-blue-400 flex flex-col items-center overflow-x-hidden text-center justify-between flex-shrink-0 fixed`}>
      <div className="flex flex-col items-center">
      <img alt="Site-Logo" className="inline sm:hidden my-2 p-3" src={`${logo}`} />
     <Link to="/addproject">
        <button className="bg-white my-2 mb-4 p-4 rounded">
          {" "}
          <MdAdd className="inline mx-2" />
          Add A project
        </button>
      </Link>
      {projectLinks}
      </div>

    </div>
  );
};

export default Sidebar;
