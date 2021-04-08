import { useState, useEffect } from "react";
import Sidebar from "./SidebarComponent";
import Navbar from "./NavbarComponent";
import ProjectDetails from "./ProjectDetailsComponent";
import SettingsPage from "./SettingsPage";
import DefaultProject from "./DefaultProject";
import { Switch, Route, Redirect } from "react-router-dom";
import AddProject from "./AddProject";
import UpdateProfile from "./UpdateProfile";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";
import cuid from "cuid";
const Home = () => {
  const { currentUser } = useAuth();
  const [projects, updateProject] = useState([]);
  const [sortTask, updateSort] = useState(null);
  const [sidebarVisible, updateSidebar] = useState(false);
  const [isTaskLoading, toggleTaskLoading] = useState(false);
  useEffect(() => {
    const getProjects = async () => {
      try {
        var querySnapshot = await database.projects
          .where("uid", "==", currentUser.uid)
          .get();
        const projects = [];
        querySnapshot.forEach((doc) => {
          let project = doc.data();
          project.id = doc.id;
          projects.push(project);
        });
        querySnapshot = await database.projects
          .where("allowedUsers", "array-contains", currentUser.uid)
          .get();
        querySnapshot.forEach((doc) => {
          let project = doc.data();
          project.id = doc.id;
          projects.push(project);
          console.log(project);
        });
        if (projects.length !== 0) updateProject(projects);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  }, [currentUser.uid]);

  const addProject = (project) => {
    updateProject([...projects, project]);
  };
  const deleteProject = (project) => {
    updateProject(projects.filter((pro) => pro.id !== project));
    return projects[0].id;
  };
  const updateTaskProgress = async (project, id, value) => {
    toggleTaskLoading(true);
    try {
      const pIndex = projects.findIndex((pro) => pro.id === project);
      var newArr = [...projects];
      const updatedTasks = projects[pIndex].tasks.map((task) => {
        if (task.taskID === id) task.progress += value;
        return task;
      });
      const newLastUpdated = database.convertTimestamp(new Date());
      console.log();
      newArr[pIndex].lastUpdated = newLastUpdated;
      await database.projects.doc(project).update({
        tasks: updatedTasks,
        lastUpdated: newLastUpdated,
      });
      updateProject(newArr);
    } catch (err) {
      console.log(err);
    }
    toggleTaskLoading(false);
  };
  const handleSort = (value) => {
    updateSort(value);
  };

  const deleteTask = async (project, id, task, progress) => {
    toggleTaskLoading(true);
    const currentProject = database.projects.doc(project);
    const taskToDel = {
      progress: progress,
      taskName: task,
      taskID: id,
    };
    try {
      const newLastUpdated = database.convertTimestamp(new Date());
      await currentProject.update({
        tasks: database.arrayRemove(taskToDel),
        lastUpdated: newLastUpdated,
      });
      const nArr = projects.map((pro) => {
        if (pro.id === project) {
          return {
            ...pro,
            tasks: pro.tasks.filter((task) => task.taskID !== id),
            lastUpdated: newLastUpdated,
          };
        } else return pro;
      });
      updateProject(nArr);
    } catch (err) {
      console.log(err);
    }
    toggleTaskLoading(false);
  };
  const addTask = async (project, task) => {
    toggleTaskLoading(true);
    const pID = projects.findIndex((pro) => pro.id === project);
    const newTask = {
      taskID: cuid.slug(),
      taskName: task,
      progress: 0,
    };
    try {
      const newLastUpdated = database.convertTimestamp(new Date());
      console.log(newLastUpdated);
      const currentProject = database.projects.doc(project);
      await currentProject.update({
        tasks: database.arrayUnion(newTask),
        lastUpdated: newLastUpdated,
      });
      const newArr = projects.map((pro) => {
        if (pro.id === project) {
          pro.lastUpdated = newLastUpdated;
          pro.tasks = [...projects[pID].tasks, newTask];
          return pro;
        } else return pro;
      });
      updateProject(newArr);
    } catch (err) {
      console.log(err);
      alert("error");
    }
    toggleTaskLoading(false);
  };
  const toggleSidebar = () => {
    updateSidebar(!sidebarVisible);
  };
  const updateProjectSettings = (project) => {
    const newProjects = projects.map((pro) => {
      if (pro.id === project.id) return project;
      else return pro;
    });
    updateProject(newProjects);
  };
  const getAccessToken = async (project) => {
    toggleTaskLoading(true);
    let reqProject = projects.filter((pro) => pro.id === project)[0];
    let currentTime = new Date();
    let newAccessToken;
    // currentTime =new Date(currentTime.setTime(currentTime.getTime() + 15*60000));
    // currentTime = new Date();
    // const timediff = currentTime - Date.parse(reqProject.tokenValidity.toDate());
    // console.log(timediff);
    if (!reqProject.tokenValidity) {
      newAccessToken = cuid.slug();
    } else if (
      Date.parse(currentTime) - Date.parse(reqProject.tokenValidity.toDate()) >
      0
    ) {
      newAccessToken = cuid.slug();
    } else {
      console.log("This Token is still valid");
      toggleTaskLoading(false);

      return;
    }
    currentTime = new Date(
      currentTime.setTime(currentTime.getTime() + 15 * 60000)
    );
    try {
      const newTokenValidity = database.convertTimestamp(currentTime);
      const newLastUpdated = database.convertTimestamp(new Date());
      await database.projects.doc(project).update({
        accessToken: newAccessToken,
        tokenValidity: newTokenValidity,
        lastUpdated: newLastUpdated,
      });
      reqProject = {
        ...reqProject,
        accessToken: newAccessToken,
        tokenValidity: newTokenValidity,
        lastUpdated: newLastUpdated,
      };
      const newArr = projects.map((pro) => {
        if (pro.id === project) {
          return reqProject;
        } else return pro;
      });
      updateProject(newArr);
    } catch (e) {
      console.log(e);
    }
    toggleTaskLoading(false);
  };
  const addAccessToken = async (token) => {
    console.log(token);
    let dataID, data;
    try {
      var query = await database.projects
        .where("accessToken", "==", token)
        .get();
      query.forEach((doc) => {
        dataID = doc.id;
        data = doc.data();
      });

      // console.log(data);
      const newLastUpdated = database.convertTimestamp(new Date());
      query = await database.projects.doc(dataID).update({
        allowedUsers: database.arrayUnion(currentUser.uid),
        lastUpdated: newLastUpdated,
      });

      if (!data.allowedUsers) data.allowedUsers = [currentUser.uid];
      else data.allowedUsers = [...data.allowedUsers, currentUser.uid];
      data.id = dataID;
      data.lastUpdated = newLastUpdated;
      addProject(data);
      return { message: "success", type: "success" };
    } catch (err) {
      return { message: err.message, type: "error" };
    }
  };
  return (
    <div className="h-full">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-row h-full">
        <Sidebar
          sidebarVisible={sidebarVisible}
          addAccessToken={addAccessToken}
          projects={projects.map((project) => {
            return {
              id: project.id,
              projectName: project.projectName,
            };
          })}
        />
        <Switch>
          <Route
            exact={true}
            path="/addproject"
            render={() => (
              <AddProject
                addProject={addProject}
                sidebarVisible={sidebarVisible}
                updateSidebar={updateSidebar}
              />
            )}
          />
          <Route
            exact={true}
            path="/updateprofile"
            render={() => (
              <UpdateProfile
                sidebarVisible={sidebarVisible}
                updateSidebar={updateSidebar}
              />
            )}
          />
          <Route
            exact={true}
            path="/home"
            render={() => (
              <DefaultProject
                sidebarVisible={sidebarVisible}
                updateSidebar={updateSidebar}
              />
            )}
          />
          <Route
            exact={true}
            path="/:id"
            render={({ match }) => {
              const data = projects.filter(
                (project) => project.id === match.params.id
              )[0];
              if (data)
                return (
                  <ProjectDetails
                    data={data}
                    sortTask={sortTask}
                    updateTaskProgress={updateTaskProgress}
                    deleteTask={deleteTask}
                    handleSort={handleSort}
                    addTask={addTask}
                    isTaskLoading={isTaskLoading}
                    sidebarVisible={sidebarVisible}
                    updateSidebar={updateSidebar}
                    getAccessToken={getAccessToken}
                  />
                );
              else return <Redirect to={"/home"} />;
            }}
          ></Route>
          <Route
            path="/:id/settings"
            exact={true}
            render={({ match }) => {
              const data = projects.filter(
                (project) => project.id === match.params.id
              )[0];
              if (data)
                return (
                  <SettingsPage
                    data={data}
                    isTaskLoading={isTaskLoading}
                    updateProjectSettings={updateProjectSettings}
                    sidebarVisible={sidebarVisible}
                    deleteProject={deleteProject}
                    updateSidebar={updateSidebar}
                  />
                );
              else return <Redirect to="/" />;
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
