import {useState} from 'react'
import { useAuth } from "../Context/AuthContext";
import {database} from "../firebase";
const Relogin = ({isLoading,    toggleLoading})=> {
    const {
        currentUser,
        reloginUser
      } = useAuth();
      const [email, setEmail] = useState(currentUser.email);
      const emailChange = (event) => {
            setEmail(event.target.value);
      }
      const [password, setPassword] = useState("");
      const passwordChange = (event) => {
            setPassword(event.target.value);
      }
      const [message, setMessage] = useState({message:"" , type:"error"});
      const handleRelogin = async (e) => {
          e.preventDefault();
        toggleLoading(true);  
        try { 
                const credential = await database.authProvider.credential(currentUser.email,password);
              const g = await reloginUser(credential);
                setMessage({message: "ReLogged In",type:"success"})

            } catch (err) {
              console.log(err)
              setMessage({message:err.message, type:"error"});
            }
            toggleLoading(false);
      }
    return (
          <div className="border p-4 rounded  my-2 md:my-4">
          <span className="text-2xl block"> Relogin </span>
          {message.message.length > 0 ? (
            <span
              className={`${
                message.type === "error"
                  ? "text-red-600"
                  : "text-green-600"
              } block my-2`}
            >
               {message.message}
            </span>
          ) : null}

          <div className="flex flex-col items-start">
          <div>
              <label htmlFor="email">Email</label>
          <input type="text"
                name="email"
              className="border-2 py-2 px-4 rounded my-2 mx-2"
              value={email}
              onChange={emailChange}
            />
          </div>
          <div>
              <label htmlFor="password">Password</label>
          <input type="password"
                name="password"
              className="border-2 py-2 px-4 rounded my-2 mx-2"
              value={password}
              onChange={passwordChange}
            />
          </div>
            <button
              className={`bg-green-300 border-green-500 border-2 px-4 py-2 my-2 rounded mx-4 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading}
              onClick={handleRelogin}
            >
             Login
            </button>
          </div>
        </div>

    )
}

export default Relogin
