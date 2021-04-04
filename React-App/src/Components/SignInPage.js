import { useState } from "react";
import Navbar from "./NavbarComponent";
import { useAuth } from "../Context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import GoogleButton from "react-google-button";

function SignInPage() {
  const history = useHistory();
  const { signupWithEmail, loginWithEmail, signInWithGoogle } = useAuth();
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
    event.preventDefault();
    try {
      await signInWithGoogle();
      history.push("/");
    } catch {
      console.log("Eocountered and Error");
    }
  };
  return (
    <div className="h-full">
      <Navbar displayEvery={true} />
      <div className="flex flex-row justify-center items-centered rounded">
        <div className="bg-gray-100 p-4 m-4 sm:w-auto w-screen divide-y divide-gray-300 md:w-3/5 xl:w-2/5">
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
                    className={`p-2 px-4 rounded bg-green-400 my-4 ${isLoading ? "opacity-50 cursor-not-allowed" : null}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {loginMethod}
                  </button>
                  <button onClick={handleLoginToggle} disabled={isLoading}>
                    Not A user yet..?Chick Here
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div className="flex flex-col items-center">
            <GoogleButton
              onClick={handleGoogleSignIn}
              className="my-4"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
