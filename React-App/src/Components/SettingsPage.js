import { useState,useEffect } from "react";
import AllLevelColors from "./AllLevelColors";
import DummyProgressLevel from "./DummyProgressLevel";
import { useHistory } from "react-router-dom";
import { database } from "../firebase";
import {MdClose} from "react-icons/md";
function SettingsPage({ data, updateProjectSettings,sidebarVisible,updateSidebar }) {
  const [project, alterProject] = useState(data);
  const [levelColor, changeLevelColor] = useState("red");
  const [levelTag, changeLevelTag] = useState("");
  const [isLoading, toggleLoading] = useState(false);
  const [deleteInput, setInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [levelError, setLevelError] = useState("");

  const history = useHistory();
  useEffect(() =>{
    updateSidebar(false);
},[updateSidebar]);

  const handleChange = (event) => {
    alterProject({ ...project, projectName: event.target.value });
  };
  const handleLevelTag = (e) => {
    changeLevelTag(e.target.value);
  };
  const handleDelInput = (event) => {
    setInput(event.target.value);
  }
  const handleDeleteProject = async () => {
    toggleLoading(true);
    const id = project.id;
    try {
      await database.projects.doc(id).delete();
      history.push("/home");
    }
    catch (err) {
      console.log(err);
      toggleLoading(false);
    }
  }
  const handleLabelAdd = (e) => {
    e.preventDefault();
    if (levelTag.length >= 3 && levelTag.length <=10)
       {alterProject({
        ...project,
        progressLevels: [
          ...project.progressLevels,
          {
            levelTag: levelTag,
            colorId: levelColor,
          },
        ],
      });
    return }
    setLevelError("Length of label should be between 3 to 10 characters");
  };
  const handleLabelDelete = (event, tag) => {
    event.preventDefault();
    alterProject({
      ...project,
      progressLevels: project.progressLevels.filter(
        (progress) => progress.levelTag !== tag
      ),
    });
  };
  const displayLabels = project.progressLevels.map((progress, index) => (
    <DummyProgressLevel
      deleteLevel={handleLabelDelete}
      key={index}
      id={progress.colorId}
      tag={progress.levelTag}
      showDelete={true}
    />
  ));
  const handleLabelColor = (event) => {
    event.preventDefault();
    changeLevelColor(event.target.id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
      if(project.projectName.length <= 3 || project.projectName.length > 15) {
        setNameError("Project name should be between 4 to 15 characters long");
        return;
      }
    
     if (project.progressLevels.length < 2)
      { 
        setLevelError("Progress Levels should be greater than 2");
        return;
      }
  
      setLevelError("");
      setNameError("");
      if (data.progressLevels.length > project.progressLevels.length) {
        const alterTask = project.tasks.map((task) => {
          if (task.progress >= project.progressLevels.length) {
              task.progress = project.progressLevels.length -1;
          }
          return task;
        });
        alterProject({
          ...project,
          tasks: alterTask
        });

      }
      handleUpdateProject();
    
  };

  const handleUpdateProject = async () => {
    toggleLoading(true);
    const id = project.id;
    const tempProject = project;
    delete tempProject.id;
    const newLastUpdated =database.convertTimestamp(new Date());
    tempProject.lastUpdated = newLastUpdated;
    project.lastUpdated = newLastUpdated;
    alterProject(tempProject);
    try {
      await database.projects.doc(id).set(project);
      tempProject.id = id;
      alterProject(tempProject);
      updateProjectSettings(project);
      history.push(`/${id}`);
    } catch (err) {
      console.log(err);
      toggleLoading(false);
    }


  };
  return (
    <div className={`p-2 md:p-4 w-full mt-16 ${ sidebarVisible ? "ml-52" : "ml-0" }  transition-all duration-500 md:ml-60`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl">Edit <span className="italic mx-2">{data.projectName}</span></h2>
      <div className="flex flex-col">
        <form>
        <div className="my-4 text-3xl border p-2 items-center lg:p-4 flex flex-row flex-wrap justify-start">
            <label htmlFor="projectName">Name:</label>
            <input
              name="projectName"
              placeholder="Give a name to your project"
              className="p-2 md:p-4 mx-2 md:mx-4 my-2 border-2 rounded text-lg md:text-2xl focus:border-gray-400"
              onChange={handleChange}
              value={project.projectName}
              type="text"
            />
          </div>
          {nameError.length > 0 && (
            <div className="flex flex-row justify-between text-red-600 bg-red-200 my-2 px-4 py-2 rounded">
              {nameError}{" "}
              <button
                onClick={() => {
                  setNameError("");
                }}
              >
                <MdClose />
              </button>
            </div>
          )}
          {levelError.length > 0 && (
            <div className="flex flex-row justify-between text-red-600 bg-red-200 my-2 px-4 py-2 rounded">
              {levelError}{" "}
              <button
                onClick={() => {
                  setLevelError("");
                }}
              >
                <MdClose />
              </button>
            </div>
          )}
          <div className="flex flex-col lg:flex-row items-start lg:items-center border p-4 my-2">
            <div className="flex flex-row items-center">
              <AllLevelColors
                handleLabelColor={handleLabelColor}
                active={levelColor}
              />
            </div>
            <div className="my-2">
              <label htmlFor="labelName">Label: </label>{" "}
              <input
                name="labelName"
                placeholder="e.g. Initialzied"
                onChange={handleLevelTag}
                className="rounded py-2 px-4 mx-2 border-2 focus:border-gray-400"
                value={levelTag}
              />
            </div>
            <button
              onClick={handleLabelAdd}
              className={`rounded py-2 px-4 bg-green-400 my-2 ${
                isLoading ? "cursor-not-allowed opacity-50" : null
              }`}
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          <div className="flex flex-row flex-wrap p-4 my-2 md:my-4 border">
            {displayLabels}
          </div>
          <button
            className={`rounded py-2 px-4 bg-indigo-600 my-4 ${
              isLoading ? "cursor-not-allowed opacity-50" : null
            }`}
            onClick={handleSubmit}
            type="submit"
            disabled={isLoading}
          >
            Update Project
          </button>
        </form>
      </div>
      <div className="border p-4 my-2 md:my-4 flex-col flex items-start">
        <h3 className="text-3xl my-2">Unsafe Area</h3>
        <p className="text">Done with the Project and don't want it to take that space in the sidebar, reminding you that you never actually finished the project and you are just deleting it so that you can tell your self you finished the project.
          Is it so...., then go ahead... <span className="font-bold block my-2">But remember, this process is irreversible.</span>
          Type the name of the project in the Input</p>
          <input className="px-4 py-2 my-1 border-2 rounded border-gray-200 focus:border-gray-400" value={deleteInput} onChange={handleDelInput} />
      <button className={`bg-red-300 text-red-600 py-2 px-4 my-2 rounded border-red-500 border-2 ${deleteInput===data.projectName ? "" : "cursor-not-allowed opacity-50"}`} disabled={!deleteInput===data.projectName} onClick={handleDeleteProject}>Delete Project</button>
      </div>
    </div>
  );
}

export default SettingsPage;
