import {useState} from "react";

const AddProject = () => {
    const [newProject, addNewProject] = useState();
    const handleChange = (e) => {
        addNewProject({...newProject,[e.target.name]: e.target.value})
    }
    return (
    <div className="p-4 w-full">
        <h2 className="text-4xl">Add A Project</h2>
        <div>
            <form>
                <div className="my-4 text-3xl">
                    <label htmlFor="projectName">Name</label>
                <input name="projectName" placeholder="Give a name to your project" className="p-4 bg-gray-400 " onChange={handleChange}/>
                </div>
            </form>
        </div>
    </div>
    )} 

export default AddProject;