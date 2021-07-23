import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/bugGame";
import "./index.css";
import "./transitions.css";
import Help from "./Pages/bugGameHelp";
import firebase from "firebase/app";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Achievements from "./Pages/achievements";
import TreeJournal from "./Pages/treeJournal";
import { AnimatedSwitch } from 'react-router-transition';

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (user.displayName) {
        setUsername(user.displayName)
      }
      if (user.uid) {
        setUserID(user.uid)
      }
      console.log(username,userID)
    }
    else {
      console.log("Not logged in.")
    }
  })

  return (
    <Router>
      {(!username || !userID) ?
      <Login/>
      :
      <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper">
        <Route exact path="/">
          <Home userID={userID} username={username}/>
        </Route>
        <Route exact path="/home">
          <Home userID={userID} username={username}/>
        </Route>
        <Route exact path="/game">
          <Game userID={userID} username={username}/>
        </Route>
        <Route exact path="/achievements">
          <Achievements userID={userID} username={username}/>
        </Route>
        <Route exact path="/help" component={Help} />
        <Route exact path="/demo" component={TreeJournal} />
      </AnimatedSwitch>
      }
    </Router>
  );
};

export default App;
