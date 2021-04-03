import {useState} from 'react';
import AllLevelColors from "./AllLevelColors";
import DummyProgressLevel from "./DummyProgressLevel";


function SettingsPage({data,updateProject}) {
    const [project, alterProject] = useState(data);
    const [levelColor, changeLevelColor] = useState("red");
    const [levelTag, changeLevelTag] = useState("");
    const [isLoading, toggleLoading] = useState(false);
    const handleChange = (event) => {
        alterProject({...project,projectName: event.target.value});
    }
    const handleLevelTag = (e) => {
        changeLevelTag(e.target.value);
      };
      const handleLabelAdd = (e) => {
        e.preventDefault();
        const newProgressLevel = {
          levelTag: levelTag,
          color: levelColor,
        };
        // if (levelTag.length >= 3)
        //   updateProject({
        //     ...project,
        //     progressLevels: [...project.progressLevels, newProgressLevel],
        //   });
      };
    const displayLabels = project.progressLevels.map((progress, index) => (
        <DummyProgressLevel
        //   deleteLevel={handleLabelDelete}
          key={index}
          color={progress.color}
          tag={progress.levelTag}
        />
      ));
      const handleLabelColor = (event) => {
        event.preventDefault();
        changeLevelColor(event.target.id);
      };
    return (
        <div className="p-2 md:p-4 w-full">
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
  
            <div className="flex flex-col md:flex-row items-center border p-4 my-2">
              <div className="flex flex-row items-center">
              <AllLevelColors  handleLabelColor={handleLabelColor} active={levelColor}/>
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
            //   onClick={handleAddProject}
              type="submit" 
              disabled={isLoading}
            >
              Update Project
            </button>
          </form>
        </div>
      </div>
    )
}

export default SettingsPage
