import {MdClose } from "react-icons/md";
import labelColors from "../Data/labelColors";
const DummyProgressLevel = ({id, tag, deleteLevel}) => {
const color =  labelColors.filter(color => color.id === id)[0].color;
return (<div className={`${color} p-3 rounded px-5 py-2 mx-3 my-2 `}> {tag} <button className="text-lg ml-2 align-text-bottom inline" onClick={(e)=> deleteLevel(e,tag)}> <MdClose /> </button></div>)

}

export default DummyProgressLevel;