import { useState } from "react";
import Task from "./TaskComponent";
import ProgressLevels from "./ProgressLevels";
import {MdSettings} from "react-icons/md";
import {Link} from "react-router-dom";
const ProjectDetails = ({
  data,
  updateTaskProgress,
  deleteTask,
  sortTask,
  handleSort,
  addTask,
  isTaskLoading,
  sidebarVisible
}) => {
  const [newTask, addNewTask] = useState("");
  const handleNewTask = (event) => {
   
    addNewTask(event.target.value);
  }
  const submitNewTask = () => {
    if(newTask!=="")
    addTask(data.id,newTask);
    addNewTask("");
  }
  const sortAllTasks = (value) => {
    if (sortTask === null) return true;
    else if (sortTask === value.progress) return true;
    else return false;
  };
  const allTask = data.tasks
    .filter(sortAllTasks)
    .map((task) => (
      <Task
        projectID={data.id}
        key={task.taskID}
        id={task.taskID}
        name={task.taskName}
        progress={task.progress}
        level={data.progressLevels}
        updateTaskProgress={updateTaskProgress}
        deleteTask={deleteTask}
        isTaskLoading={isTaskLoading}
      />
    ));
  return (
    <div className={`p-2 md:p-4 flex-col flex justify-start w-full mt-16 ${ sidebarVisible ? "ml-52" : "ml-0" }  transition-all duration-500 md:ml-60`}>
      <div className="flex-col md:flex-row flex justify-between md:items-center items-start">
        <div className="flex-row flex justify-start  items-end">
          <h2 className="text-5xl lg:text-6xl m-2 italic">{data.projectName}</h2>
          <Link to={`/${data.id}/settings`}><button className={`rounded my-4 p-2 bg-gray-100`} disabled={isTaskLoading}><MdSettings /></button></Link>
          {/* <h6 className="text-xl italic my-4">{data}</h6> */}
        </div>
        <div className="flex flex-row items-end flex-wrap justify-end">
          <input className="text-lg border-2 bg-gray-200 focus:border-indigo-600 rounded mx-2 px-2 py-2" value={newTask} onChange={handleNewTask} />
        <button
          className={`bg-gray-300 text-base px-4 py-2 rounded mx-2 my-2 ${isTaskLoading ? "cursor-not-allowed opacity-50" : null}`}
          onClick={submitNewTask}
          disabled={isTaskLoading}
        >
          Add A Task
        </button>
        </div>
      </div>
      <ProgressLevels levels={data.progressLevels} handleSort={handleSort} sortTask={sortTask}/>
      <div className="flex flex-col justify-around">{allTask}</div>
    </div>
  );
};

export default ProjectDetails;
