//import 'firebaseui/dist/firebaseui.css'
import firebaseConfig from "./firebaseconfig";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// import "firebase/functions";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();
// export const functions = firebase.functions();
