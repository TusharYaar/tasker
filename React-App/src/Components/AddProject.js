import {useState,useEffect} from "react";
import { MdEventBusy,MdCheck } from "react-icons/md";
import labelColors from "../Data/labelColors";
const LabelColor = ({id,handleLabelColor,active}) =>  {
    return (
                <div>
                    <button className={`bg-${id}-400 p-3 rounded-full h-10 w-10 mx-2`} id={id} onClick={handleLabelColor}>{active === id ? <MdCheck/>: null }</button>
                </div>
    )
}

const AddProject = () => {
    const [newProject, addNewProject] = useState();
    const [labelColor,changeLabelColor] = useState("red");
    const handleChange = (e) => {
        addNewProject({...newProject,[e.target.name]: e.target.value})
    }
    const handleLabelColor = (event) => {
        event.preventDefault();
        changeLabelColor(event.target.id);
    }
    const displayLabelColors = labelColors.map(color => <LabelColor key={color} id={color} handleLabelColor={handleLabelColor} active={labelColor}/>)
    return (
    <div className="p-4 w-full">
        <h2 className="text-4xl">Add A Project</h2>
        <div>
            <form>
                <div className="my-4 text-3xl border p-4">
                    <label htmlFor="projectName">Name</label>
                <input name="projectName" placeholder="Give a name to your project" className="p-4 bg-gray-400 mx-4 " onChange={handleChange}/>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-row items-center">{displayLabelColors}</div>
                    <div><label htmlFor="labelName">Label: </label> <input name="labelName" placeholder="e.g. Initialzied"/></div>
                    <button>Add</button>
                </div>
            </form>
        </div>
    </div>
    )} 

export default AddProject;