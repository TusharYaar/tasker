import { useState } from "react";
import Sidebar from "./SidebarComponent";
import Navbar from "./NavbarComponent";
import ProjectDetails from "./ProjectDetailsComponent";
import { Switch, Route } from "react-router-dom";
import AddProject from "./AddProject";
import data from "../Data/data";

const Home = () => {
  const [projects, updateProject] = useState(data);
  const [sortTask, updateSort] = useState(null);

  const updateTaskProgress = (project, id, value) => {
    const pID = projects.findIndex((pro) => pro.projectID === project);
    const tID = projects[pID].tasks.findIndex((task) => task.taskID === id);
    var newArr = [...projects];
    newArr[pID].tasks[tID].progress += value;
    updateProject(newArr);
  };
  const handleSort = (value) => {
    updateSort(value);
  };

  const deleteTask = (project, id) => {
    const nArr = projects.map((pro) => {
      if (pro.projectID === project) {
        return {
          ...pro,
          tasks: pro.tasks.filter((task) => task.taskID !== id),
        };
      } else return pro;
    });
    console.log(nArr);
    updateProject(nArr);
  };
  const addTask = (project, task) => {
    console.log(task);
    const pID = projects.findIndex((pro) => pro.projectID === project);
    const newArr = projects.map((pro) => {
      if (pro.projectID === project) {
        pro.tasks = [
          ...projects[pID].tasks,
          {
            taskID: `T${projects[pID].tasks.length + 1}`,
            taskName: task,
            progress: 0,
          },
        ];
        return pro;
      } else return pro;
    });
    updateProject(newArr);
  };
  return (
    <div className="h-full">
      <Navbar />
      <div className="flex flex-row h-full">
        <Sidebar
          projects={projects.map((project) => {
            return {
              projectID: project.projectID,
              projectName: project.projectName,
            };
          })}
        />
        <Switch>
          <Route exact={true} path="/addproject" component={AddProject} />
          <Route
            exact={true}
            path="/:id"
            render={({ match }) => {
              return (
                <ProjectDetails
                  data={
                    projects.filter(
                      (project) => project.projectID === match.params.id
                    )[0]
                  }
                  sortTask={sortTask}
                  updateTaskProgress={updateTaskProgress}
                  deleteTask={deleteTask}
                  handleSort={handleSort}
                  addTask={addTask}
                />
              );
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
