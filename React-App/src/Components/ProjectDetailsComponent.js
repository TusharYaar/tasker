import { useState } from "react";
import Task from "./TaskComponent";
import ProgressLevels from "./ProgressLevels";
const ProjectDetails = ({
  data,
  updateTaskProgress,
  deleteTask,
  sortTask,
  handleSort,
  addTask
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
      />
    ));
  return (
    <div className="p-5 flex-col flex justify-start w-full">
      <div className="flex-row flex justify-between items-center my-4">
        <div className="flex-row flex justify-around items-end">
          <h2 className="text-6xl m-4 ">{data.projectName}</h2>
          <h6 className="text-xl italic my-4">{data.accessCode}</h6>
        </div>
        <div className="flex flex-row items-end">
          <input className="text-lg border-2 bg-gray-200 focus:border-indigo-600 rounded py-1 px-2" value={newTask} onChange={handleNewTask} />
        <button
          className="bg-gray-300 text-base px-4 py-2 rounded mx-4"
          onClick={submitNewTask}
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
