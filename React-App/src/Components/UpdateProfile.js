import { useState } from "react";
import {database} from "../firebase";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
function UpdateProfile({ sidebarVisible }) {
  const history = useHistory();
  const {
    currentUser,
    updateEmail,
    setCurrentUser,
    deleteUser,
    updatePassword,reloginUser
  } = useAuth();
  const [email, updateEmailInput] = useState("");
  const [emailMessage, setEmailMessage] = useState({
    message: "",
    type: "error",
  });
  const [password, updatePasswordInput] = useState("");
  const [passwordCon, updatePasswordConInput] = useState("");
  const [passwordMessage, setPasswordMessage] = useState({
    message: "",
    type: "error",
  });
  const [delErr, setDelErr] = useState("");
  const [isLoading, toggleLoading] = useState(false);
  const [deleteInput, setInput] = useState("");
  const [relogin, toggleRelogin] = useState(false);
  const [reloginMessage, setReloginMessage] = useState({
    message: "",
    type: "error",
  })
  const handleDelInput = (event) => {
    setInput(event.target.value);
  };
  const emailChange = (event) => {
    updateEmailInput(event.target.value);
  };

  const updateEmailinDb = async () => {
    toggleLoading(true);
    if (relogin) toggleRelogin(false);

    try {
      await updateEmail(email);
      setCurrentUser({ ...currentUser, email: email });
      setEmailMessage({
        message: "Successfully Updated your Email",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      setEmailMessage({ message: err.message, type: "error" });
      if (err.code === "auth/requires-recent-login") toggleRelogin(true);
    }
    toggleLoading(false);
  };
  const handleDeleteUser = async () => {
    toggleLoading(true);
    if (relogin) toggleRelogin(false);

    try {
      await deleteUser();
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.log(err);
      setDelErr(err.message);
      if (err.code === "auth/requires-recent-login") toggleRelogin(true);
    }
  };
  const passwordChange = (event) => {
    switch (event.target.name) {
      case "password":
        updatePasswordInput(event.target.value);
        break;
      case "passwordCon":
        updatePasswordConInput(event.target.value);
        break;
      default:
        console.log("error");
    }
  };

  const updatePasswordInDb = async () => {
    toggleLoading(true);
    try {
      if (password === passwordCon && password.length > 5) {
        await updatePassword(password);
        setPasswordMessage({
          message: "Successfully updated password",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      setPasswordMessage({ message: err.message, type: "error" });
    }
    toggleLoading(false);
  };
  const handleRelogin = async (e) => {
    e.preventDefault();
  toggleLoading(true);  
  try { 
          const credential = await database.authProvider.credential(currentUser.email,password);
         await reloginUser(credential);
          setReloginMessage({message: "ReLogged In",type:"success"})

      } catch (err) {
        console.log(err)
        setReloginMessage({message:err.message, type:"error"});
      }
      toggleLoading(false);
}
  return (
    <div
      className={`p-2 md:p-4 w-full mt-16 ${
        sidebarVisible ? "ml-52" : "ml-0"
      }  transition-all duration-500 md:ml-60`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl">Update Profile</h2>
      <div className="flex flex-col ">
        <div className={`border p-4  rounded  my-2 md:my-4 ${relogin ? "h-auto" : "h-0 hidden"}` }>
          <span className="text-2xl block"> Relogin </span>
          {reloginMessage.message.length > 0 ? (
            <span
              className={`${
                reloginMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-600"
              } block my-2`}
            >
               {reloginMessage.message}
            </span>
          ) : null}

          <div className="flex flex-col items-start">
          <div>
              <span htmlFor="email">Email</span>
<span className="italic mx-8 px-4 py-2">{currentUser.email}</span>
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

        <div className="border p-4 rounded  my-2 md:my-4">
          <span className="text-2xl block"> Update Email</span>
          <span className="text-2xl my-2">Current Email: </span>
          <span className="italic text-xl">{currentUser.email}</span>
          {emailMessage.message.length > 0 ? (
            <span
              className={`${
                emailMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-600"
              } block my-2`}
            >
              {emailMessage.message}
            </span>
          ) : null}

          <div>
            <input
              className="border-2 py-2 px-4 rounded my-2"
              value={email}
              onChange={emailChange}
            />
            <button
              className={`bg-blue-300 border-blue-500 border-2 px-4 py-2 my-2 rounded mx-4 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading}
              onClick={updateEmailinDb}
            >
              Update Email
            </button>
          </div>
        </div>
        <div className="border p-4 rounded  my-2 md:my-4">
          <span className="text-2xl my-2">Update Password </span>
          {passwordMessage.message.length > 0 ? (
            <span
              className={`${
                passwordMessage.type === "error"
                  ? "text-red-600"
                  : "text-green-600"
              } block my-2`}
            >
              {passwordMessage.message}
            </span>
          ) : null}
          <div className="flex flex-col items-start">
            {" "}
            <div>
              <label htmlFor="password">New Password </label>
              <input
                name="password"
                type="password"
                className="border-2 py-2 px-4 rounded my-2 mx-2"
                value={password}
                onChange={passwordChange}
              />
            </div>
            <div>
              <label htmlFor="password">Retype New Password </label>
              <input
                name="passwordCon"
                type="password"
                className="border-2 py-2 px-4 rounded my-2"
                value={passwordCon}
                onChange={passwordChange}
              />
            </div>
            <button
              className={`bg-blue-300 border-blue-500 border-2 px-4 py-2 my-2 rounded mx-4 ${
                password !== passwordCon || isLoading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={password !== passwordCon || isLoading}
              onClick={updatePasswordInDb}
            >
              {" "}
              Update Password
            </button>
          </div>
        </div>
        <div className="border p-4 my-2 md:my-4 flex-col flex items-start">
          <h3 className="text-3xl my-2">Unsafe Area</h3>
          <p className="text">
            Done with your projects and don't want to work on new projects
            because you are frustuated with not getting any single one of them
            working, and want to blame it on me by deleting your account..?? Ok
            go ahead..{" "}
            <span className="font-bold block my-2">
              But remember, this process is irreversible.
            </span>
            Type your email in the Input
          </p>
          {delErr.length > 0 ? (
            <span className="text-red-600 block my-2">{delErr}</span>
          ) : null}
          <input
            className="px-4 py-2 my-1 border-2 rounded border-gray-400"
            value={deleteInput}
            onChange={handleDelInput}
          />
          <button
            className={`bg-red-300 text-red-600 py-2 px-4 my-2 rounded border-red-500 border-2 ${
              deleteInput === currentUser.email
                ? ""
                : "cursor-not-allowed opacity-50"
            }`}
            disabled={!deleteInput === currentUser.email}
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
