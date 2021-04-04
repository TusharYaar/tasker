import {useState} from "react";
import labelColors from '../Data/labelColors';
import { MdKeyboardArrowUp,MdKeyboardArrowDown,MdClose } from "react-icons/md";
const Task = ({progress, name, level,id ,projectID,updateTaskProgress,deleteTask, isTaskLoading}) => {
  const [showDelete,toggleDelete]= useState(false);
  const handleDeleteToggle = () => {
    toggleDelete(!showDelete);
  }
  const getColor = (colorId) => {   
    return labelColors.filter(color => color.id === colorId)[0].color;
}
  
  return (
    <div className="flex flex-col m-4 rounded bg-gray-100">
    <div className="flex justify-between flex-wrap">
    <div className="flex flex-row justify-start">
    <div className={`${getColor(level[progress].colorId)} p-7 rounded-l` }></div>
    <div className="flex items-center text-xl mx-4 md:text-2xl">
      {name}
    </div>
    </div>
    <div className="flex items-center text-2xl my-2">
    {level[progress+1]!== undefined ? <button className={`rounded-full h-10 w-10 ${getColor(level[progress+1].colorId)} p-2  ${isTaskLoading ? "cursor-not-allowed opacity-50" : null}`} onClick={() => updateTaskProgress(projectID,id,1)} disabled={isTaskLoading}><MdKeyboardArrowUp/></button> : <div></div>}
    {level[progress-1]!== undefined ? <button className={`rounded-full h-10 w-10 ${getColor(level[progress-1].colorId)} p-2 mx-5  ${isTaskLoading ? "cursor-not-allowed opacity-50" : null}`} onClick={() => updateTaskProgress(projectID,id,-1)} disabled={isTaskLoading}><MdKeyboardArrowDown/></button> : <div className="p-4 w-12 mx-5"></div>}
    <button className={`rounded-full h-10 w-10 bg-gray-300 p-2 mr-4 text-2xl  ${isTaskLoading ? "cursor-not-allowed opacity-50" : null}`} onClick={handleDeleteToggle} disabled={isTaskLoading}><MdClose/></button>
    
    </div>
    </div>
    {showDelete ? <div className="self-end mb-3 mx-5">Sure ?<button className={`rounded py-2 px-4 bg-red-600 ml-3  ${isTaskLoading ? "cursor-not-allowed opacity-50" : null} `} onClick={()=>deleteTask(projectID,id,name,progress)} disabled={isTaskLoading}>Delete</button></div>: null}
    </div>
  );
};

export default Task;
