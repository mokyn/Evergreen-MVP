//import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCsi5LHQfHcp8mW--Y0bb5F_7xFOfaDNSM",
    authDomain: "evergreen-5dedc.firebaseapp.com",
    projectId: "evergreen-5dedc",
    storageBucket: "evergreen-5dedc.appspot.com",
    messagingSenderId: "455311379903",
    appId: "1:455311379903:web:d2c83d12b58f144eab250a",
    measurementId: "G-SC8VM3WLEY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

export default provider;