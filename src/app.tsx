import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/bugGame";
import "./index.css";
import Help from "./Pages/bugGameHelp";
<<<<<<< HEAD
import { Login } from "./Pages/login";
import Home from "./Pages/home";
=======
import { Login, Home } from "./Pages/login";
>>>>>>> 2d96690858295b015c10c5517c3cfd2508d71e9d
import TreeJournal from "./Pages/treeJournal";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/demo" component={TreeJournal} />
      </Switch>
    </Router>
  );
};

export default App;
