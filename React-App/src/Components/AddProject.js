import { useState } from "react";
import { MdCheck } from "react-icons/md";
import labelColors from "../Data/labelColors";
import DummyProgressLevel from "./DummyProgressLevel";
import {useHistory} from "react-router-dom";
import {useAuth } from "../Context/AuthContext";
import {database} from "../firebase"
const LabelColor = ({ id, handleLabelColor, active }) => {
  return (
    <div>
      <button
        className={`bg-${id}-400 p-3 rounded-full h-10 w-10 mx-2`}
        id={id}
        onClick={handleLabelColor}
      >
        {active === id ? <MdCheck /> : null}
      </button>
    </div>
  );
};

const AddProject = ({ addProject }) => {
  const {currentUser } = useAuth();
  const history = useHistory();
  const [newProject, addNewProject] = useState({
    projectName: "",
    progressLevels: [],
  });
  const [levelColor, changeLevelColor] = useState("red");
  const [levelTag, changeLevelTag] = useState("");
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
      color: levelColor,
    };
    if (levelTag.length > 3)
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
    // const res = await fetch("http://localhost:5000/posts", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(project),
    // });
    // return await res.json();
    // else return false
    try { const user = await database.projects.add(project);

      project.id = user.id;
      return project;
}catch (err) {
      console.log(err);
    }

  };

  const handleAddProject = async (event) => {
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
        // accessCode: "weiryg34",
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
        history.push("/");
      }
    }
  };
  const displayLabelColors = labelColors.map((color) => (
    <LabelColor
      key={color}
      id={color}
      handleLabelColor={handleLabelColor}
      active={levelColor}
    />
  ));
  const displayLabels = newProject.progressLevels.map((progress, index) => (
    <DummyProgressLevel
      deleteLevel={handleLabelDelete}
      key={index}
      color={progress.color}
      tag={progress.levelTag}
    />
  ));
  return (
    <div className="p-4 w-full">
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
            <div className="flex flex-row items-center">
              {displayLabelColors}
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
              className="rounded py-2 px-4 bg-green-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-row flex-wrap p-4 my-2 border">
            {displayLabels}
          </div>
          <button
            className="rounded py-2 px-4 bg-indigo-600"
            onClick={handleAddProject}
            type="submit"
          >
            {" "}
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
