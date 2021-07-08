import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/bugGame";
import "./index.css";
import Help from "./Pages/bugGameHelp";
import {Login} from "./Pages/login";
import Home from "./Pages/home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route path="/help" component={Help} />
      </Switch>
    </Router>
  );
};

export default App;
