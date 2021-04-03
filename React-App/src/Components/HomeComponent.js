import { useState, useEffect } from "react";
import Sidebar from "./SidebarComponent";
import Navbar from "./NavbarComponent";
import ProjectDetails from "./ProjectDetailsComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import AddProject from "./AddProject";
import UpdateProfile from "./UpdateProfile";
import {useAuth} from "../Context/AuthContext";
import {database} from "../firebase"
const Home = () => {
  const {currentUser} = useAuth();
  const [projects, updateProject] = useState([]);
  const [sortTask, updateSort] = useState(null);
  const [sidebarVisible,updateSidebar] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      if(data)
     updateProject(data);
    };
    getProjects();
  }, []);
  const fetchProjects = async () => {
    try {
    const querySnapshot = await database.projects.where("uid","==",currentUser.uid).get();
    const projects = [];
      querySnapshot.forEach((doc) => {
        let project =  doc.data();
        project.id = doc.id;
        projects.push(project);
            });
    return projects;
} catch (err) {
  console.log(err);
}
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
  const toggleSidebar = () => {
    updateSidebar(!sidebarVisible);
  }
  return (
    <div className="h-full">
      <Navbar toggleSidebar={toggleSidebar}/>
      <div className="flex flex-row h-full">
        <Sidebar
          sidebarVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
          projects={projects.map((project) => {
            return {
              id: project.id,
              projectName: project.projectName,
            };
          })}
        />
        <Switch>
          <Route exact={true} path="/addproject" render={ () => <AddProject addProject={addProject} />} />
          <Route exact={true} path="/updateprofile"component={UpdateProfile}/>
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
