//import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import firebaseConfig from "./firebaseconfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export {database,};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
