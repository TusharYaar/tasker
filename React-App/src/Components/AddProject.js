import { useState } from "react";
import DummyProgressLevel from "./DummyProgressLevel";
import AllLevelColors from "./AllLevelColors";
import {useHistory} from "react-router-dom";
import {useAuth } from "../Context/AuthContext";
import {database} from "../firebase";
const AddProject = ({ addProject }) => {
  const {currentUser } = useAuth();
  const history = useHistory();
  const [newProject, addNewProject] = useState({
    projectName: "",
    progressLevels: [],
  });
  const [levelColor, changeLevelColor] = useState("red");
  const [levelTag, changeLevelTag] = useState("");
  const [isLoading, toggleLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    addNewProject({ ...newProject, [e.target.name]: e.target.value });
  };
  const handleLevelTag = (e) => {
    changeLevelTag(e.target.value);
  };
  const handleLabelDelete = (event, tag) => {
    event.preventDefault();
    addNewProject({
      ...newProject,
      progressLevels: newProject.progressLevels.filter(
        (progress) => progress.levelTag !== tag
      ),
    });
  };
  const handleLabelAdd = (e) => {
    e.preventDefault();
    const newProgressLevel = {
      levelTag: levelTag,
      colorId: levelColor,
    };
    if (levelTag.length >= 3)
      addNewProject({
        ...newProject,
        progressLevels: [...newProject.progressLevels, newProgressLevel],
      });
  };
  const handleLabelColor = (event) => {
    event.preventDefault();
    changeLevelColor(event.target.id);
  };
  const submitForm = async (project) => {
    try { const user = await database.projects.add(project);
      project.id = user.id;
      return project;
}catch (err) {
      console.log(err);
    }

  };

  const handleAddProject = async (event) => {
    toggleLoading(true);
    event.preventDefault();
    if (newProject.projectName.length <= 3)
      alert("Project name cannot be empty");
    else if (newProject.progressLevels.length < 2)
      alert("Progress levels should be atlest 2");
    else {
      const project = {
        ...newProject,
        tasks: [],
        uid: currentUser.uid,
         createdAt: database.getCurrentTimestamp(),
      };
      const responseProject = await submitForm(project)
      if (responseProject) {
        addNewProject({ projectName: "", progressLevels: [] });
        changeLevelColor("red");
        changeLevelTag("");
        addProject(responseProject);
        history.push(`/${responseProject.id}`);
      }
      else {
        alert("error adding project");
        toggleLoading(false);
      }
    }

  };
  const displayLabels = newProject.progressLevels.map((progress, index) => (
    <DummyProgressLevel
      deleteLevel={handleLabelDelete}
      key={index}
      id={progress.colorId}
      tag={progress.levelTag}
    />
  ));
  return (
    <div className="p-2 md:p-4 w-full">
      <h2 className="text-4xl">Add A Project</h2>
      <div className="flex flex-col">
        <form>
          <div className="my-4 text-3xl border p-4">
            <label htmlFor="projectName">Name</label>
            <input
              name="projectName"
              placeholder="Give a name to your project"
              className="p-4 mx-4 "
              onChange={handleChange}
              value={newProject.projectName}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center border p-4 my-2">
  
              <AllLevelColors  handleLabelColor={handleLabelColor} active={levelColor}/>
      
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
              className={`rounded py-2 px-4 bg-green-600 ${isLoading ? "cursor-not-allowed opacity-50" : null}`}
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          <div className="flex flex-row flex-wrap p-4 my-2 border">
            {displayLabels}
          </div>
          <button
            className={`rounded py-2 px-4 bg-indigo-600 ${isLoading ? "cursor-not-allowed opacity-50" : null}`}
            onClick={handleAddProject}
            type="submit" 
            disabled={isLoading}
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
