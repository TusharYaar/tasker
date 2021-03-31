import React, { Component } from "react";
import Sidebar from "./SidebarComponent";
import Navbar from "./NavbarComponent";
import ProjectDetails from "./ProjectDetailsComponent";
import { Switch, Route } from "react-router-dom";
import data from "../Data/data";

function RenderProject({ data, match, updateTask}) {
  data = data.filter((project) => project.projectID === match.params.id);
  return <ProjectDetails data={data[0]} />;
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: data,currenProject: null };
  }
  
  render() {
    return (
      <div>
        <Navbar />
        <div className="flex flex-row">
          <Sidebar
            projects={this.state.projects.map((project) => {
              return { projectID: project.projectID, projectName: project.projectName };
            })}
          />
          <Switch>
            <Route
              exact={true}
              path="/:id"
              render={({ match }) => {
                return (
                  <RenderProject data={this.state.projects} match={match} updateTask={this.updateTask}/>
                );
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home;
