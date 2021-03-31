import {useState} from "react";
import Task from "./TaskComponent";
import ProgressLevels from "./ProgressLevels";
const ProjectDetails = ({ data }) => {
    const [addTaskModal, toggleTaskModal] = useState(false);
    console.log(data.ProgressLevels)
  const allTask = data.tasks.map((task) => (
    <Task key={task.taskid} name={task.taskname} progress={task.progress} level={data.progresslevels[task.progress]}/>
  ));
  return (
    <div className="p-5 flex-col flex justify-around w-full">
        {addTaskModal ? "hello" : ""}
      <div className="flex-row flex justify-between items-center my-4">
        <div  className="flex-row flex justify-around items-end">
          <h2 className="text-6xl mx-4">{data.projectName}</h2>
          <h6 className="text-xl italic">{data.accessCode}</h6>
        </div>
        <button className="bg-gray-500 p-4 rounded" onClick={ () => toggleTaskModal(!addTaskModal)}>ADD A Task</button>
      </div>
      <ProgressLevels levels={data.progresslevels}/>
      <div className="flex flex-col justify-around">{allTask}</div>
    </div>
  );
};

export default ProjectDetails;
