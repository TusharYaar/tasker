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
        var projects = [];
        database.projects
          .where("allowedUsers", "array-contains", currentUser.uid)
          .onSnapshot((snapshot) => {
            projects= [];
            snapshot.forEach((doc) => {
              
              let project = doc.data();
              project.id = doc.id;
              projects.push(project);
            });
            updateProject(projects);
          });
        // var querySnapshot2 = await database.projects
        //   .where("allowedUsers", "array-contains", currentUser.uid)
        //   .get();
        // querySnapshot2.forEach((doc) => {
        //   let project = doc.data();
        //   project.id = doc.id;
        //   projects.push(project);
        //   console.log(project);
        // });
        if (projects.length !== 0) updateProject(projects);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  }, [currentUser.uid]);

  const updateTaskProgress = async (project, id, value) => {
    toggleTaskLoading(true);
    try {
      const pIndex = projects.findIndex((pro) => pro.id === project);
      const updatedTasks = projects[pIndex].tasks.map((task) => {
        if (task.taskID === id) task.progress += value;
        return task;
      });
      const newLastUpdated = database.convertTimestamp(new Date());
      await database.projects.doc(project).update({
        tasks: updatedTasks,
        lastUpdated: newLastUpdated,
      });
      toggleTaskLoading(false);
      return;
    } catch (err) {
      console.log(err);
      toggleTaskLoading(false);
      return err.message;
    }

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
      toggleTaskLoading(false);
      return ;
    } catch (err) {
      console.log(err);
      toggleTaskLoading(false);
      return err.message;

    }

  };
  const addTask = async (project, task) => {
    toggleTaskLoading(true);
    const newTask = {
      taskID: cuid.slug(),
      taskName: task,
      progress: 0,
    };
    try {
      const newLastUpdated = database.convertTimestamp(new Date());
      const currentProject = database.projects.doc(project);
      await currentProject.update({
        tasks: database.arrayUnion(newTask),
        lastUpdated: newLastUpdated,
      });
      toggleTaskLoading(false);
      return;
    } catch (err) {
      console.log(err);
      toggleTaskLoading(false);
      return err.message;
    }

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
    } catch (e) {
      console.log(e);
    }
    toggleTaskLoading(false);
  };
  const addAccessToken = async (token) => {
    const allTokens = projects.map(project => project.accessToken);
    if(allTokens.includes(token)) {
      return { message:"Project already added", type: "error"};
    }
    let dataID;
    try {
      var query = await database.projects
        .where("accessToken", "==", token)
        .get();
      query.forEach((doc) => {
        dataID = doc.id;
      });
      const newLastUpdated = database.convertTimestamp(new Date());
      query = await database.projects.doc(dataID).update({
        allowedUsers: database.arrayUnion(currentUser.uid),
        lastUpdated: newLastUpdated,
      });
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
