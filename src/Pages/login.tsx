import { provider } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "../index.css";
import GoogleButton from "react-google-button";import Title from "../Components/Title";

const handleLogin = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
};

const Login = () => {
    return (
      <div>
        <Title/>
        <div className="grid justify-items-center">
          <GoogleButton onClick={handleLogin} />
        </div>
      </div>
    )
};


export default Login;

