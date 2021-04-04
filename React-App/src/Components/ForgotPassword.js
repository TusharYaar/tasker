import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Navbar from "./NavbarComponent";
import {useHistory} from "react-router-dom";
import {MdKeyboardArrowLeft} from "react-icons/md";
const  ForgotPassword = () => {
    const history = useHistory();
const     {forgotPassword} = useAuth();
const [email,updateEmail] = useState("");
const [isLoading, toggleLoading] = useState(false);
const [successMessage, setSuccess] = useState("");
const [errorMessage, setError ] = useState("");
const [button, updateButton] = useState("Send Reset Email");
const handleChange = (event) => {
    updateEmail(event.target.value)
}

const handleSubmit =async (event) => {
    event.preventDefault();
    toggleLoading(true);
    try {
        await forgotPassword(email);
        setSuccess("Email has Been Sent Successfully");
        setError("");
        let time = 0;
        const timeInterval = setInterval(() =>{
            updateButton(`Send again after ${60-time} sec`);
            time++;
            if(60-time<0)
                time=60;
        },1000);
        const timer = setTimeout(() => {
            clearInterval(timeInterval);
            toggleLoading(false);
            updateButton("send Reset Email"); 
          }, 62000);
          return () => clearTimeout(timer);
    }
    catch (err) {
        setSuccess("");
        setError(err.message);
        toggleLoading(false);
    }
}
const goBack = (event) => {
    event.preventDefault();
    history.push("/login");
} 
    return (
<div className="h-full">
      <Navbar displayEvery={true} />
      <div className="flex flex-row justify-center items-centered rounded">
        <div className="bg-gray-100 p-4 m-4 sm:w-auto w-screen md:w-3/5 xl:w-2/5">
            <button onClick={goBack} className={`bg-blue-200 rounded px-2 py-1 text-sm`}><MdKeyboardArrowLeft className="inline"/> Back to login & Signup</button>
            <h2 className="text-4xl my-2">Forgot Password</h2>
            {errorMessage.length > 0 ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded text-center w-full ">{errorMessage}</p> : null}
            {successMessage.length > 0 ? <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 my-3 rounded text-center w-full ">{successMessage}</p> : null}
            
            <div className="flex flex-col my-2">
              <form>
                <div className="flex flex-col my-2">
                  <label htmlFor="email" className="text-xl">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="py-2 px-4 rounded   my-1"
                    value={email}
                    onChange={handleChange}

/>               </div>
<button
                    className={`p-2 px-4 rounded bg-green-400 my-4 ${isLoading ? "opacity-50 cursor-not-allowed" : null}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {button}
                  </button>

              </form>
            </div>

        </div>
      </div>
    </div>
    )
}

export default ForgotPassword;
