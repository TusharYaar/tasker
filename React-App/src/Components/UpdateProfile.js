import {useState} from 'react'
import {useAuth} from "../Context/AuthContext";
import {auth,database } from "../firebase"
function UpdateProfile({sidebarVisible}) {
    const {currentUser,updateEmail,setCurrentUser} = useAuth();
    const [email,updateEmailInput] = useState("");
    const [emailErr,setEmailErr] = useState("");
    const [emailSuccess,setEmailSuccess] = useState("");
    const [isLoading, toggleLoading] = useState(false);
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
          </div>
        </div>
    )
}

export default UpdateProfile
