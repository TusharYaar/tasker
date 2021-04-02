import { useState, useEffect } from "react";
import Sidebar from "./SidebarComponent";
import Navbar from "./NavbarComponent";
import ProjectDetails from "./ProjectDetailsComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import AddProject from "./AddProject";

const Home = () => {
  const [projects, updateProject] = useState([]);
  const [sortTask, updateSort] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      updateProject(data);
    };
    getProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    console.log(data);
    return data;
  };
  const addProject = (project) => {
    updateProject([...projects,project]);
  }
  const updateTaskProgress = (project, id, value) => {
    const pID = projects.findIndex((pro) => pro.id === project);
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
      if (pro.id === project) {
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
    const pID = projects.findIndex((pro) => pro.id === project);
    const newArr = projects.map((pro) => {
      if (pro.id === project) {
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
              id: project.id,
              projectName: project.projectName,
            };
          })}
        />
        <Switch>
          <Route exact={true} path="/addproject" render={ ({history}) => <AddProject history={history} addProject={addProject} />} />
          <Route
            exact={true}
            path="/:id"
            render={({ match }) => {
              const data = projects.filter(
                (project) => project.id === match.params.id
              )[0];
              if(data)
              return (
                <ProjectDetails
                  data={data}
                  sortTask={sortTask}
                  updateTaskProgress={updateTaskProgress}
                  deleteTask={deleteTask}
                  handleSort={handleSort}
                  addTask={addTask}
                />
              );
              else return <Redirect to={"/"} />
            }}
          ></Route>
        </Switch>
      </div>
    </div>
  );
};

export default Home;
