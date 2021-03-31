import React, { Component } from 'react';
import Sidebar from './SidebarComponent';
import Navbar from './NavbarComponent';
import ProjectDetails from './ProjectDetailsComponent';
import {Switch ,Route } from 'react-router-dom';
import data from '../Data/data';



function RenderProject ({data,match}) {
    data = data.filter((project) => project.projectID === match.params.id)
  return  <ProjectDetails data={data[0]}/>
}
class Home extends Component {
  constructor(props) {
        super(props);
        this.state ={ projects: data,
        selectedProject : null
    }}

    render () {
        return (
            <div>
                <Navbar />
                <div className="flex flex-row">
                <Sidebar projects={this.state.projects.map(project => {
                    return {projectID: project.projectID, name: project.name} })} />
                <Switch>
                    <Route exact={true} path="/:id"  component={ ({match}) => {return <RenderProject data= {this.state.projects} match={match}/>}} />
                </Switch>
        </div>
            </div>
        )
    }
}

export default Home;