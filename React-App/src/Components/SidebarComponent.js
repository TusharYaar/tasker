import React from "react";
import {NavLink} from "react-router-dom"
class Sidebar extends React.Component {
  render() {
    const projectLinks = this.props.projects.map(project => {return <NavLink exact={true} activeClassName="font-bold" key={project.projectID} to={`/${project.projectID}`}>{project.name}</NavLink>});
    return <div className="w-60 h-max bg-blue-400">Sidebar
    <div className="flex flex-col my-4">
    {projectLinks}
    
    </div>
    </div>;
  }
}

export default Sidebar;
