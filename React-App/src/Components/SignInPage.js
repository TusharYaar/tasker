import React from 'react'
import Navbar from "./NavbarComponent";
import {useAuth} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";



function SignInPage() {
    const history = useHistory();
    const { signup, signInWithGoogle} = useAuth();
    const handleSignUp = async (email, password) => {
        try {
            await signup(email, password);
            history.push("/");
        }
        catch {
            console.log("error");
        }
    }
    const handleGoogleSignIn =async (event) => {
        event.preventDefault();
        try {
        await signInWithGoogle();
        console.log("Redirect"); 
        history.push("/wd9ch");
        }
        catch { 
        console.log("Eocountered and Error");
        }
    }
    return (
        <div className="h-full">
            <div className="flex flex-row justify-center items-centered">
                <button className="rounded py-2 px-4 m-16 bg-blue-500" onClick={handleGoogleSignIn}>SignInWithGoogle</button>
            </div>
        </div>
    )
}

export default SignInPage;
