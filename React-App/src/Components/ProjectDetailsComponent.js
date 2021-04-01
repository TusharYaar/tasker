import { useState } from "react";
import Task from "./TaskComponent";
import ProgressLevels from "./ProgressLevels";
const ProjectDetails = ({
  data,
  updateTaskProgress,
  deleteTask,
  sortTask,
  handleSort,
}) => {
  const [addTaskModal, toggleTaskModal] = useState(false);
  const sortAllTasks = (value) => {
    if (sortTask === null) return true;
    else if (sortTask === value.progress) return true;
    else return false;
  };
  const allTask = data.tasks
    .filter(sortAllTasks)
    .map((task) => (
      <Task
        projectID={data.projectID}
        key={task.taskID}
        id={task.taskID}
        name={task.taskname}
        progress={task.progress}
        level={data.progresslevels}
        updateTaskProgress={updateTaskProgress}
        deleteTask={deleteTask}
      />
    ));
  return (
    <div className="p-5 flex-col flex justify-around w-full">
      {addTaskModal ? "hello" : ""}
      <div className="flex-row flex justify-between items-center my-4">
        <div className="flex-row flex justify-around items-end">
          <h2 className="text-6xl mx-4">{data.projectName}</h2>
          <h6 className="text-xl italic">{data.accessCode}</h6>
        </div>
        <button
          className="bg-gray-500 p-4 rounded"
          onClick={() => toggleTaskModal(!addTaskModal)}
        >
          ADD A Task
        </button>
      </div>
      <ProgressLevels levels={data.progresslevels} handleSort={handleSort} />
      <div className="flex flex-col justify-around">{allTask}</div>
    </div>
  );
};

export default ProjectDetails;
