import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB-IxGRWZs_rqjusKeV_coN0xgi_MkwJFg",
  authDomain: "tasker-e8cd9.firebaseapp.com",
  projectId: "tasker-e8cd9",
  storageBucket: "tasker-e8cd9.appspot.com",
  messagingSenderId: "831981575141",
  appId: "1:831981575141:web:8feb69490d508115786d0c",
  measurementId: "G-JYCRVPTY2B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  projects: firestore.collection('projects'),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
console.log();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebaseConfig;