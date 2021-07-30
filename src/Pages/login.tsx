import { provider } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Link } from "react-router-dom";
import "../index.css";
import GoogleButton from "react-google-button";import Title from "../Components/Title";

const handle_login = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
};

const Login = () => {
    return (
      <div>
        <Title/>
        <div className="grid justify-items-center">
          <GoogleButton onClick={handle_login} />
        </div>
        <div className="grid justify-items-stretch">
        </div>
      </div>
    )
  };


export default Login;

