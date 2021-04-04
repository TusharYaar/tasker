import {useState} from 'react'
import {useAuth} from "../Context/AuthContext";
import { useHistory} from "react-router-dom";
import {auth,database } from "../firebase"
function UpdateProfile({sidebarVisible}) {
  const history = useHistory();
    const {currentUser,updateEmail,setCurrentUser,deleteUser} = useAuth();
    const [email,updateEmailInput] = useState("");
    const [emailErr,setEmailErr] = useState("");
    const [emailSuccess,setEmailSuccess] = useState("");
    const [delErr,setDelErr] = useState("");
    const [isLoading, toggleLoading] = useState(false);
    const [deleteInput, setInput] = useState("");
    const handleDelInput = (event) => {
      setInput(event.target.value);
    }
  const emailChange = (event) => {
    updateEmailInput(event.target.value);
  }

  const updateEmailinDb =async () => {
    toggleLoading(true);
    try {
    await updateEmail(email);
    setCurrentUser({...currentUser, email: email});
      setEmailErr("");
      setEmailSuccess("Successfully Updated your Email")
    }  catch (err) {
      console.log(err);
      setEmailErr(err.message);
      setEmailSuccess("");
    }
    toggleLoading(false);
  }
  const handleDeleteUser =async () => {
    toggleLoading(true);
    try {
      await deleteUser();
      setCurrentUser(null);
      history.push("/");
    }  catch (err) {
      console.log(err);
      setDelErr(err.message);
    }
  }
    return (
        <div className={`p-2 md:p-4 w-full mt-16 ${ sidebarVisible ? "ml-52" : "ml-0" }  transition-all duration-500 md:ml-60`}>
          <h2 className="text-4xl">Update Profile</h2>
          <div className="flex flex-col my-2 md:my-4">
            <div className="border p-4 rounded">
             <span className="text-2xl my-2">Current Email: </span><span className="italic text-xl">{currentUser.email}</span>
             {emailSuccess.length > 0? <span className="text-green-600 block my-2">{emailSuccess}</span>: null}
             {emailErr.length > 0? <span className="text-red-600 block my-2">{emailErr}</span>: null}
          <div className="my-2"><input className="border-2 py-2 px-4 rounded" value={email} onChange={emailChange}/><button className={`bg-blue-300 border-blue-500 border-2 px-4 py-2 rounded mx-4 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`} disabled={isLoading} onClick={updateEmailinDb}> Update Email</button></div>
          </div>
          <div className="border p-4 my-2 md:my-4 flex-col flex items-start">
        <h3 className="text-3xl my-2">Unsafe Area</h3>
        <p className="text">Done with the Project and don't want to work on new projects because you are frustuated with not getting any single one of them working, and want to blame it on me by deleting your account..?? Ok go ahead.. <span className="font-bold block my-2">But remember, this process is irreversible.</span>
          Type your email in the Input</p>
          {delErr.length > 0? <span className="text-red-600 block my-2">{delErr}</span>: null}
          <input className="px-4 py-2 my-1 border-2 rounded border-gray-400" value={deleteInput} onChange={handleDelInput} />
      <button className={`bg-red-300 text-red-600 py-2 px-4 my-2 rounded border-red-500 border-2 ${deleteInput===currentUser.email ? "" : "cursor-not-allowed opacity-50"}`} disabled={!deleteInput===currentUser.email} onClick={handleDeleteUser}>Delete User</button>
      </div>
          </div>
        </div>
    )
}

export default UpdateProfile
