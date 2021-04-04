import { useState } from "react";
import AllLevelColors from "./AllLevelColors";
import DummyProgressLevel from "./DummyProgressLevel";
import { useHistory } from "react-router-dom";
import { database } from "../firebase";
function SettingsPage({ data, updateProjectSettings,sidebarVisible,deleteProject }) {
  const [project, alterProject] = useState(data);
  const [levelColor, changeLevelColor] = useState("red");
  const [levelTag, changeLevelTag] = useState("");
  const [isLoading, toggleLoading] = useState(false);
  const [deleteInput, setInput] = useState("");
  const history = useHistory();
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
    try {await database.projects.doc(id).delete();
      const nId = deleteProject(id);
      history.push(`/${nId}`)
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleLabelAdd = (e) => {
    e.preventDefault();
    if (levelTag.length >= 3)
      alterProject({
        ...project,
        progressLevels: [
          ...project.progressLevels,
          {
            levelTag: levelTag,
            colorId: levelColor,
          },
        ],
      });
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
    />
  ));
  const handleLabelColor = (event) => {
    event.preventDefault();
    changeLevelColor(event.target.id);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (project.projectName.length <= 3) alert("Project name cannot be empty");
    else if (project.progressLevels.length < 2)
      alert("Progress levels should be atlest 2");
    else {
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
    }
  };

  const handleUpdateProject = async () => {
    toggleLoading(true);
    const id = project.id;
    try {
      delete project.id;
      await database.projects.doc(id).set(project);
      updateProjectSettings(project, id);
      changeLevelColor("red");
      changeLevelTag("");
    } catch (err) {
      console.log(err);
    }
    toggleLoading(false);
    history.push(`/${id}`);
  };
  return (
    <div className={`p-2 md:p-4 w-full mt-16 ${ sidebarVisible ? "ml-52" : "ml-0" }  transition-all duration-500 md:ml-60`}>
      <h2 className="text-4xl">Edit {data.projectName}</h2>
      <div className="flex flex-col">
        <form>
          <div className="my-4 text-3xl border p-4">
            <label htmlFor="projectName">Name</label>
            <input
              name="projectName"
              placeholder="Give a name to your project"
              className="p-4 mx-4 "
              onChange={handleChange}
              value={project.projectName}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center border p-4 my-2">
            <div className="flex flex-row items-center">
              <AllLevelColors
                handleLabelColor={handleLabelColor}
                active={levelColor}
              />
            </div>
            <div>
              <label htmlFor="labelName">Label: </label>{" "}
              <input
                name="labelName"
                placeholder="e.g. Initialzied"
                onChange={handleLevelTag}
                className="rounded py-2 px-4 mx-2"
                value={levelTag}
              />
            </div>
            <button
              onClick={handleLabelAdd}
              className={`rounded py-2 px-4 bg-green-600 ${
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
            className={`rounded py-2 px-4 bg-indigo-600 ${
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
          <input className="px-4 py-2 my-1 border-2 rounded border-gray-400" value={deleteInput} onChange={handleDelInput} />
      <button className={`bg-red-300 text-red-600 py-2 px-4 my-2 rounded border-red-500 border-2 ${deleteInput===data.projectName ? "" : "cursor-not-allowed opacity-50"}`} disabled={!deleteInput===data.projectName} onClick={handleDeleteProject}>Delete Project</button>
      </div>
    </div>
  );
}

export default SettingsPage;
