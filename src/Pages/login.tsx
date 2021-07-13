import { provider } from "../firebase";
//import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Link } from "react-router-dom";
import "../index.css";
import GoogleButton from "react-google-button";
import Tree from "../images/pinetree.svg";
import squirrelImg from "../images/squirrel.png";

let username: string;
let user;

var handle_login = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      //var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = credential.accessToken;
      // The signed-in user info.
      user = result.user;
      console.log(user)
      username = result.user.displayName;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      // ...
    });
};

const Login = () => (
  <>
    <div className="flex items-center justify-center m-8">
      <img src={Tree} alt="logo" className="m-0 w-20 h-50"></img>
      <h1 className="m-0 font-custom text-green-500	font-bold text-5xl">
        Evergreen
      </h1>
    </div>
    <div className="grid justify-items-center">
      <GoogleButton onClick={handle_login} />
    </div>
    <div className="grid justify-items-stretch">
      <Link
        className="m-2 justify-self-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        to="/home"
      >
        Go
      </Link>
    </div>
  </>
);


export { Login, username, user };

