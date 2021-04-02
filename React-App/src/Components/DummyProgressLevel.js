import {MdClose } from "react-icons/md"
const DummyProgressLevel = ({color, tag, deleteLevel}) => {
return (<div className={`bg-${color}-400 p-3 rounded px-5 py-2 mx-3 `}> {tag} <button className="text-lg ml-2 align-text-bottom inline" onClick={(e)=> deleteLevel(e,tag)}> <MdClose /> </button></div>)

}

export default DummyProgressLevel;