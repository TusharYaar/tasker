import { useState, useEffect } from "react";
import DummyProgressLevel from "./DummyProgressLevel";
import AllLevelColors from "./AllLevelColors";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";
import { MdClose } from "react-icons/md";

const AddProject = ({ addProject, sidebarVisible, updateSidebar }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [newProject, addNewProject] = useState({
    projectName: "",
    progressLevels: [],
  });
  const [levelColor, changeLevelColor] = useState("red");
  const [levelTag, changeLevelTag] = useState("");
  const [isLoading, toggleLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [levelError, setLevelError] = useState("");

  useEffect(() => {
    updateSidebar(false);
  }, [updateSidebar]);

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
    if (levelTag.length >= 3 && levelTag.length <=10)
       {addNewProject({
        ...newProject,
        progressLevels: [...newProject.progressLevels, newProgressLevel],
      });
    return;}
    setLevelError("Length of label should be between 3 to 10 characters");
  };
  const handleLabelColor = (event) => {
    event.preventDefault();
    changeLevelColor(event.target.id);
  };
  const submitForm = async (project) => {
    try {
      const user = await database.projects.add(project);
      project.id = user.id;
      return project;
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProject = async (event) => {
    toggleLoading(true);
    event.preventDefault();
    if (
      newProject.projectName.length <= 3 ||
      newProject.projectName.length > 15
    ) {
      toggleLoading(false);
      setNameError("Project name should be between 4 to 15 characters long");
      return;
    }
    if (newProject.progressLevels.length < 2) {
      toggleLoading(false);
      setLevelError("Project should have atlest 2 levels");
      return;
    }
    const project = {
      ...newProject,
      tasks: [],
      uid: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      lastUpdated: database.getCurrentTimestamp(),
      allowedUsers: [currentUser.uid],
    };
    const responseProject = await submitForm(project);
    if (responseProject) {
      addNewProject({ projectName: "", progressLevels: [] });
      changeLevelColor("red");
      changeLevelTag("");
      addProject(responseProject);
      history.push(`/${responseProject.id}`);
    } else {
      alert("error adding project");
      toggleLoading(false);
    }
  };
  const displayLabels = newProject.progressLevels.map((progress, index) => (
    <DummyProgressLevel
      deleteLevel={handleLabelDelete}
      key={index}
      id={progress.colorId}
      tag={progress.levelTag}
      showDelete={true}
    />
  ));
  return (
    <div
      className={`p-2 md:p-4 w-full mt-16 ${
        sidebarVisible ? "ml-52" : "ml-0"
      }  transition-all duration-500 md:ml-60`}
    >
      <h2 className="text-4xl">Add A Project</h2>
      <div className="flex flex-col">
        <form>
          <div className="my-4 text-3xl border p-2 items-center lg:p-4 flex flex-row flex-wrap justify-start">
            <label htmlFor="projectName">Name:</label>
            <input
              name="projectName"
              placeholder="Give a name to your project"
              className="p-2 md:p-4 mx-2 md:mx-4 my-2 border-2 rounded text-lg md:text-2xl"
              onChange={handleChange}
              value={newProject.projectName}
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
            <div className="flex flex-row justify-between text-red-600 bg-red-200 px-4 my-2 py-2 rounded">
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

          <div className="flex flex-col lg:flex-row lg:items-center items-start border p-4 my-2">
            <AllLevelColors
              handleLabelColor={handleLabelColor}
              active={levelColor}
            />

            <div className="my-2">
              <label htmlFor="labelName">Label: </label>{" "}
              <input
                name="labelName"
                placeholder="e.g. Initialzied"
                onChange={handleLevelTag}
                className="rounded py-2 px-4 mx-2 border-2"
                value={levelTag}
              />
            </div>
            <button
              onClick={handleLabelAdd}
              className={`rounded py-2 px-4 my-2 bg-green-600 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          <div className="flex flex-row flex-wrap p-4 my-2 border">
            {displayLabels}
          </div>
          <button
            className={`rounded py-2 px-4 bg-indigo-600 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
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
