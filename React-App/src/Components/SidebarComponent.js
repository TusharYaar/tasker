import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import {useAuth } from "../Context/AuthContext"
import {useHistory} from "react-router-dom";
const Sidebar = ({ projects }) => {
  const history = useHistory();
  const {signOut, currentUser} = useAuth();
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
  const handleSignOut = async () => {
    try {
      await signOut();
      history.push("/login");
    }
    catch {
      console.log("error");
    }
  }


  return (
    <div className="w-60 h-full bg-blue-400 flex flex-col items-center overflow-x-hidden text-center justify-between">
      <div className="flex flex-col items-center"><Link to="/addproject">
        <button className="bg-white my-4 p-4 rounded">
          {" "}
          <MdAdd className="inline mx-2" />
          Add A project
        </button>
      </Link>
      {projectLinks}
      </div>
      {<button className="p-4 rounded bg-gray-200" onClick={signOut}>SignOut</button>}
    </div>
  );
};

export default Sidebar;
