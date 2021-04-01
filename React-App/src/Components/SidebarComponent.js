import React from "react";
import {NavLink,Link} from "react-router-dom";
import { MdAdd } from "react-icons/md";
const Sidebar = ({projects}) => {

    const projectLinks = projects.map(project => {return <NavLink className="my-2 text-lg tracking-widest  " exact={true} activeClassName="font-bold" key={project.projectID} to={`/${project.projectID}`}>{project.projectName}</NavLink>});
    return <div className="w-60 h-full bg-blue-400 flex flex-col items-center overflow-x-hidden text-center">
    <Link to="/addproject"><button className="bg-white my-4 p-4 rounded"> <MdAdd className="inline mx-2"/>Add A project</button></Link>
    {projectLinks}
    </div>;
  }

export default Sidebar;
