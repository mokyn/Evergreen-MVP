import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./Pages/bugGame";
import "./index.css";
import "./transitions.css";
import BugLesson from "./Pages/bugLesson";
import FavTrees from "./Pages/favTrees";
import firebase from "firebase/app";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Achievements from "./Pages/achievements";
import { TreeShapeLesson } from "./Pages/treeShapeLesson";
import { AnimatedSwitch } from "react-router-transition";
import { TreeGame } from "./Pages/treeGame";
import { TreePlantingOrderGame } from "./Pages/treePlantingOrderGame";
import { TreePlantingLesson } from "./Pages/treePlantingLesson";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  //asynch event to fetch login
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (user.displayName) {
        setUsername(user.displayName);
      }
      if (user.uid) {
        setUserID(user.uid);
      }
      console.log("Successfully logged in.", username, userID);
    } else {
      console.log("Not logged in.");
    }
  });

  const handleLogout = () => {
    //passed to the logout button on homepage
    firebase.auth().signOut();
    setUsername("");
    setUserID("");
  };

  return (
    <Router>
      {/*if the user is not logged in, display the login page*/}
      {!username || !userID ? (
        <Login />
      ) : (
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route exact path="/">
            <Home
              userID={userID}
              username={username}
              handleLogout={handleLogout}
            />
          </Route>
          <Route exact path="/home">
            <Home
              userID={userID}
              username={username}
              handleLogout={handleLogout}
            />
          </Route>
          <Route exact path="/buggame">
            <Game userID={userID} username={username} />
          </Route>
          <Route exact path="/achievements">
            <Achievements userID={userID} username={username} />
          </Route>
          <Route exact path="/buglesson">
            <BugLesson userID={userID} />
          </Route>
          <Route exact path="/treeshapelesson">
            <TreeShapeLesson userID={userID} />
          </Route>
          <Route exact path="/my-favorite-tree">
            <FavTrees userID={userID} username={username} />
          </Route>
          <Route exact path="/treegame">
            <TreeGame userID={userID} />
          </Route>
          <Route exact path="/tree-planting-lesson">
            <TreePlantingLesson userID={userID} username={username} />
          </Route>
          <Route exact path="/tree-order-game">
            <TreePlantingOrderGame userID={userID} username={username} />
          </Route>
        </AnimatedSwitch>
      )}
    </Router>
  );
};

export default App;
