import { useState, useEffect } from "react";
import Task from "./TaskComponent";
import ProgressLevels from "./ProgressLevels";
import { MdSettings,MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
const ProjectDetails = ({
  data,
  updateTaskProgress,
  deleteTask,
  sortTask,
  handleSort,
  addTask,
  isTaskLoading,
  sidebarVisible,
  updateSidebar
}) => {
  const [newTask, addNewTask] = useState("");
  const [taskError,setTaskError] = useState("");
  useEffect(() => {
    updateSidebar(false);
  }, [updateSidebar,data]);

  const handleNewTask = (event) => {
    addNewTask(event.target.value);
  };
  const submitNewTask = () => {
    if (newTask.length > 2 && newTask.length <15) 
    { if(taskError) setTaskError("");
      addTask(data.id, newTask);
    addNewTask("");
  } else if (newTask.length <=2 ){
    setTaskError("Task Should be greater than 2 characters long");
  } 
  else if (newTask.length >= 15) {
    setTaskError("Task Length should be smaller than 15 characters")
  }
  };
  const sortAllTasks = (value) => {
    // console.log(data.lastUpdated.toDate());
    // const date = Date();
    // console.log( typeof date.toDateString());
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
    <div
      className={`p-2 md:p-4 flex-col flex justify-start w-full mt-16 ${
        sidebarVisible ? "ml-52" : "ml-0"
      }  transition-all duration-500 md:ml-60`}
    >
      <div className="flex-col md:flex-row flex justify-between md:items-center items-start">
        <div className="flex-row flex justify-start  items-end">
          <h2 className="text-5xl lg:text-6xl m-2 italic">
            {data.projectName}
          </h2>
          <Link to={`/${data.id}/settings`}>
            <button
              className={`rounded my-4 p-2 bg-gray-100`}
              disabled={isTaskLoading}
            >
              <MdSettings />
            </button>
          </Link>
          {/* <h6 className="text-xl italic my-4">{data}</h6> */}
        </div>
        <div className="flex flex-row items-end flex-wrap justify-end my-4">
          <input
            className="text-lg border-2 bg-gray-200 focus:border-gray-400 rounded mx-2 px-2 py-2"
            value={newTask}
            onChange={handleNewTask}
          />
          <button
            className={`bg-gray-200 text-gray-700 border-2 border-gray-600 text-base px-4 py-2 rounded mx-2 my-2 ${
              isTaskLoading ? "cursor-not-allowed opacity-50" : null
            }`}
            onClick={submitNewTask}
            disabled={isTaskLoading}
          >
            Add A Task
          </button>
        </div>
      </div>
      {taskError.length > 0 &&<div className="flex flex-row justify-between text-red-600 bg-red-200 my-2 px-4 py-2 rounded">{taskError} <button onClick={()=> {setTaskError("")}}><MdClose/></button></div>}
      <ProgressLevels
        levels={data.progressLevels}
        handleSort={handleSort}
        sortTask={sortTask}
      />
      <div className="flex flex-col justify-around">{allTask}</div>
    </div>
  );
};

export default ProjectDetails;
