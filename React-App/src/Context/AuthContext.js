import React, { useContext, useState,useEffect} from 'react';
import {auth,googleProvider,githubProvider} from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState(null);
    const signInWithGoogle = () => {
        return auth.signInWithPopup(googleProvider);   
    }
    const signInWithGithub = () => {
        return auth.signInWithPopup(githubProvider);
    }
    const signupWithEmail = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    const loginWithEmail = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password);
    }
    
    const signOut=() => {
        return auth.signOut();
    }   
    const forgotPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }
    const updateEmail = (email) => {
        return auth.currentUser.updateEmail(email);
    }
    const deleteUser = () => {
        return auth.currentUser.delete();
    }
    const updatePassword = (password) => {
        return auth.currentUser.updatePassword(password);
    }
    const reloginUser = async (credential) => {
        console.log("called");
        return auth.currentUser.reauthenticateWithCredential(credential)
    }
    useEffect (()=>{
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user));
        return unsubscribe;

    },[]);
    const value = {currentUser,signupWithEmail, loginWithEmail,signInWithGoogle,signInWithGithub,signOut, forgotPassword,updateEmail,setCurrentUser, deleteUser,updatePassword, reloginUser}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        
    )
}
