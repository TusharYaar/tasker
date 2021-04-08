import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_FIREBASE_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  projects: firestore.collection('projects'),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  arrayUnion: firebase.firestore.FieldValue.arrayUnion,
  arrayRemove: firebase.firestore.FieldValue.arrayRemove,
  authProvider : firebase.auth.EmailAuthProvider,
  convertTimestamp: firebase.firestore.Timestamp.fromDate
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

export default firebaseConfig;