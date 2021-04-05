import React from 'react'
import DummyProgressLevel from './DummyProgressLevel';
import { MdKeyboardArrowUp,MdKeyboardArrowDown,MdClose } from "react-icons/md";

const DefaultProject=({sidebarVisible})=>  {
const dummyfn = () => {
    
}
const displayLabels = [{colorId:"blue", levelTag:"Level 1"},{colorId:"green", levelTag:"Level 2"},{colorId:"yellow", levelTag:"Level 3"},{colorId:"indigo", levelTag:"All"}].map( (progress,index) =>     <DummyProgressLevel
    deleteLevel={dummyfn}
    key={index}
    id={progress.colorId}
    tag={progress.levelTag}
  />)

    return (
<div className={`p-2 md:p-4 w-full mt-16 ${ sidebarVisible ? "ml-52" : "ml-0" }  transition-all duration-500 md:ml-60`}>
<h2 className="text-2xl lg:text-3xl m-2 italic">Select a Project From the Sidebar</h2>
<div className="mx-2"><p>If you don't see any, <span className="italic">then make one.</span></p>
</div><div className="rounded border my-2 md:my-4 p-2 md:p-4">
      <span className="text-xl">
These labels can be used to sort the tasks
      </span>
        <div className="flex flex-row flex-wrap items-start ">
        {displayLabels}
        </div>
</div>
<div className="rounded border my-2 md:my-4 p-2 md:p-4">
  <span className="text-xl">This is how tasks look </span>
<div className="flex flex-col m-4 rounded bg-gray-100">
    <div className="flex justify-between flex-wrap">
    <div className="flex flex-row justify-start">
    <div className={`bg-green-400 p-7 rounded-l` }></div>
    <div className="flex items-center text-xl mx-4 md:text-2xl">
      Task
    </div>
    </div>
    <div className="flex items-center text-2xl my-2">
    <button className={`rounded-full h-10 w-10 bg-yellow-400 p-2`}><MdKeyboardArrowUp/></button> 
    <button className={`rounded-full h-10 w-10 bg-blue-400 p-2 mx-5 `}><MdKeyboardArrowDown/></button> 
    <button className={`rounded-full h-10 w-10 bg-gray-300 p-2 mr-4 text-2xl`} ><MdClose/></button>
    
    </div>
    </div>
    {/* {showDelete ? <div className="self-end mb-3 mx-5">Sure ?<button className={`rounded py-2 px-4 bg-red-600 ml-3 `} onClick={()=>deleteTask(projectID,id,name,progress)} disabled={isTaskLoading}>Delete</button></div>: null} */}
    </div>

    <ul className="flex flex-col items-start">
    <li className="p-2 flex-row items-center justify-start flex my-1"> 
    <div className={`bg-green-400 px-5 py-5 rounded-l inline mr-4` }></div>specifies the current stage of the task
    </li>
      
      <li className="p-2 flex-row items-center justify-start flex my-1">
      <button className={`rounded-full h-10 w-10 bg-yellow-400 p-2 mr-4 text-2xl`}><MdKeyboardArrowUp/></button>  updates it to a higher level 
      </li>

      <li className="p-2 flex-row items-center justify-start flex my-1">
      <button className={`rounded-full h-10 w-10 bg-blue-400 p-2 mr-4 text-2xl`}><MdKeyboardArrowDown/></button> updates it to the lower level.
      </li>
      <li className="p-2 flex-row items-center justify-start flex my-1">
      <button className={`rounded-full h-10 w-10 bg-gray-300 p-2 mr-4 text-2xl`} ><MdClose/></button> deletes the task.

      </li>
    </ul>
</div>
        </div>
    )
}

export default DefaultProject;
