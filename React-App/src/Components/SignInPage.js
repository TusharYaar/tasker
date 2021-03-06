import { useState } from "react";
import Navbar from "./NavbarComponent";
import { useAuth } from "../Context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import GithubButton from 'react-github-login-button'
function SignInPage() {
  const history = useHistory();
  const { signupWithEmail, loginWithEmail, signInWithGoogle,signInWithGithub } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [loginMethod, toggleLoginMethod] = useState("Login");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [confirmPassword, updateConfirmPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const handleLoginToggle = (event) => {
    event.preventDefault();
    toggleLoginMethod(loginMethod === "Login" ? "Signup" : "Login");
  };
  const handleSignup = async () => {
    try {
      if(password !== confirmPassword) {
        const error = new Error();  
        error.message ="passwords do not match"
        throw error;
      }  
      await signupWithEmail(email, password);
    } catch (err) {
      console.log(err);
    setErrorMessage(err.message);
    setLoading(false);

    }

  };
  const handleLogin = async () => {

    try {
      await loginWithEmail(email, password);
    } catch (err) {
    setErrorMessage(err.message);
    setLoading(false);

    }
    // setLoading(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if(password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        setLoading(false);
        return;
    }
    switch (loginMethod) {
      case "Login":
        handleLogin();
        break;
      case "Signup":
        handleSignup();
        break;
        default: 
        console.log("error");
    }
  };
  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        updateEmail(event.target.value);
        break;
      case "password":
        updatePassword(event.target.value);
        break;
      case "confirmPassword":
        updateConfirmPassword(event.target.value);
        break;
     default: 
     console.log("error");
    }
  };
  const handleGoogleSignIn = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await signInWithGoogle();
      history.push("/");
    } catch (err){
      console.log("Encountered and Error");
      setErrorMessage(err.message)
      setLoading(false);
    }
  }; 
   const handleGithubSignIn = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await signInWithGithub();
      history.push("/");
    } catch (err){
      console.log("Encountered and Error");
      setErrorMessage(err.message)
      setLoading(false);
    }
  };
  return (
    <div className="h-full">
      <Navbar displayEvery={true} />
      <div className="flex flex-col justify-center items-center rounded">
        <div className="bg-gray-100 border-gray-500 border-2 rounded p-4 m-4 sm:w-auto w-screen divide-y divide-gray-300 md:w-3/5 xl:w-2/5 mt-20">
          <div className="">
            <h2 className="text-4xl">{loginMethod}</h2>
            {errorMessage.length > 0 ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded text-center w-full ">{errorMessage}</p> : null}
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

/>
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="password" className="text-xl">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="py-2 px-4 rounded w-full my-1"
                    value={password}
                    onChange={handleChange}

                  />
                </div>

                {loginMethod === "Signup" ? (
                  <div className="flex flex-col my-2">
                    <label htmlFor="confirmPassword" className="text-xl">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="py-2 px-4 rounded w-full my-1"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                ) : null}
                <div className="flex flex-col sm:flex-row my-2 items-start sm:items-center justify-between">
                  {loginMethod === "Login" ? (
                    <Link to="/forgotpassword" className="sm:order-last">
                      Forgot Password..? Click Here
                    </Link>
                  ) : null}
                  <div className="flex flex-col">
                  <button
                    className={`p-2 px-4 rounded bg-green-300 border-green-600 text-green-700 border-2 my-4 ${isLoading ? "opacity-50 cursor-not-allowed" : null}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {loginMethod}
                  </button>
                  <button onClick={handleLoginToggle} disabled={isLoading}>
                    {loginMethod ==="Login" ? "Not A user yet..?Click Here" : "Already have an account..?Click Here "}
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center flex-wrap justify-around">
            <GoogleButton
              onClick={handleGoogleSignIn}
              className="my-4 mx-2"
              disabled={isLoading}
            />            <GithubButton
            onClick={handleGithubSignIn}
            className="my-4 mx-2"
            disabled={isLoading}
          />
          </div>
        </div>
<Link to="/about">
<div className="bg-blue-200 bg-border-600 text-blue-700 border-2 px-2 py-1 rounded">Dont know what it is, read here.</div>
</Link>
      </div>
    </div>
  );
}

export default SignInPage;
