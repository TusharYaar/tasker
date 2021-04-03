import { useState, useEffect } from "react";
import Sidebar from "./SidebarComponent";
import Navbar from "./NavbarComponent";
import ProjectDetails from "./ProjectDetailsComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import AddProject from "./AddProject";
import UpdateProfile from "./UpdateProfile";
import {useAuth} from "../Context/AuthContext";
import {database} from "../firebase";
import cuid from 'cuid';
const Home = () => {
  const {currentUser} = useAuth();
  const [projects, updateProject] = useState([]);
  const [sortTask, updateSort] = useState(null);
  const [sidebarVisible,updateSidebar] = useState(false);
  const [isTaskLoading, toggleTaskLoading] = useState(false);
  useEffect(() => {
    const getProjects = async () => {
      try {
      const querySnapshot = await  database.projects.where("uid","==",currentUser.uid).get();
      const projects = [];
      querySnapshot.forEach((doc) => {
        let project =  doc.data();
        project.id = doc.id;
        projects.push(project);
            });
      if(projects)
     updateProject(projects);}
     catch(err) {
       console.log(err);
     }
    };
    getProjects();
  }, [currentUser.uid]);
  const addProject = (project) => {
    updateProject([...projects,project]);
  }
  const updateTaskProgress = async (project, id, value) => {
    toggleTaskLoading(true);
    try {
    const pIndex = projects.findIndex((pro) => pro.id === project);
    const tIndex = projects[pIndex].tasks.findIndex((task) => task.taskID === id);
    var newArr = [...projects];
    const updatedTask = {...projects[pIndex].tasks[tIndex],progress:projects[pIndex].tasks[tIndex].progress += value };
    await database.projects.doc(project).set({tasks:[updatedTask]},{merge:true});
    updateProject(newArr);
    }catch(err){
      console.log(err);
    }
    toggleTaskLoading(false);
  };
  const handleSort = (value) => {
    updateSort(value);
  };

  const deleteTask = (project, id,task,progress) => {
    const currentProject = database.projects.doc(project);
    const taskToDel = {
      progress: progress,
      taskName: task,
      taskID: id,
    }
    currentProject.update({tasks: database.arrayRemove(taskToDel)})
    const nArr = projects.map((pro) => {
      if (pro.id === project) {
        return {
          ...pro,
          tasks: pro.tasks.filter((task) => task.taskID !== id),
        };
      } else return pro;
    });
    updateProject(nArr);
  };
  const addTask = async (project, task) => {
    const pID = projects.findIndex((pro) => pro.id === project);
    const newTask = {
      taskID: cuid.slug(),
      taskName: task,
      progress: 0,
    };
    try {
    const currentProject = database.projects.doc(project);
    await currentProject.update({tasks: database.arrayUnion(newTask)});
    const newArr = projects.map((pro) => {
      if (pro.id === project) {
        pro.tasks = [
          ...projects[pID].tasks,
          newTask,
        ];
        return pro;
      } else return pro;
    });
    updateProject(newArr);}
    catch (err) {alert("error")}
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
                  isTaskLoading={isTaskLoading}
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
