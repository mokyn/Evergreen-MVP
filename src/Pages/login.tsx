import provider from "../firebase"
//import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let username: string;

var handle_login = () => {
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    username = result.user.displayName;
    console.log(result.user.displayName);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


const Login = () => (
  <div>
    <h1 className="text-center text-green-500	font-bold text-3xl m-10">Evergreen</h1>
    <div className="grid justify-items-stretch"><button onClick={handle_login} className="m-4 justify-self-center	bg-gray-300 border-2">Login with Google</button></div>
    <div className="grid justify-items-stretch"><Link className="justify-self-center" to="/home">Go</Link></div>
  </div>
)

const Home = () => (
  <div>
    <p>{"Welcome "+ username}</p>
    <div><Link to="/game">Play Game</Link></div>
  </div>
)

export {Login, Home};