import React from "react";
import { MdKeyboardArrowUp,MdKeyboardArrowDown,MdClose } from "react-icons/md";
const Task = ({progress, name, level,id ,projectID,updateTaskProgress,deleteTask}) => {
  return (
    <div className="flex justify-between m-4 rounded bg-gray-100">
    <div className="flex flex-row justify-start">
    <div className={`bg-${level[progress].color}-400 p-8 rounded-l` }></div>
    <div className="flex items-center mx-4">
      <div>{name}</div>
    </div>
    </div>
    <div className="flex items-center">
    {level[progress+1]!== undefined ? <button className={`rounded-full h-12 w-12 bg-${level[progress+1].color}-300 p-4`} onClick={() => updateTaskProgress(projectID,id,1)}><MdKeyboardArrowUp/></button> : <div></div>}
    {level[progress-1]!== undefined ? <button className={`rounded-full h-12 w-12 bg-${level[progress-1].color}-300 p-4 mx-5`} onClick={() => updateTaskProgress(projectID,id,-1)}><MdKeyboardArrowDown/></button> : <div className="p-4 w-12 mx-5"></div>}
    <button className="rounded-full h-12 w-12 bg-red-400 p-4" onDoubleClick={()=> deleteTask(projectID,id)}><MdClose/></button>
    </div>
    </div>
  );
};

export default Task;
