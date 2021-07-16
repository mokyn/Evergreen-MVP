import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/bugGame";
import "./index.css";
import Help from "./Pages/bugGameHelp";
import firebase from "firebase/app";
import Login from "./Pages/login";
import Home from "./Pages/home";
import TreeJournal from "./Pages/treeJournal";
import { isPropertySignature } from "typescript";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (user.displayName) {
        setUsername(user.displayName)
      }
      setUserID(user.uid)
      console.log(username,userID)
    }
    else {
      console.log("Not logged in.")
    }
  })

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home">
          <Home userID={userID} username={username}/>
        </Route>
        <Route exact path="/game">
          <Game userID={userID} username={username}/>
        </Route>
        <Route exact path="/help" component={Help} />
        <Route exact path="/demo" component={TreeJournal} />
      </Switch>
    </Router>
  );
};

export default App;
