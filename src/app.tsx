import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Pages/bugGame";
import "./index.css";
import Help from "./Pages/bugGameHelp";
import FavTrees from "./Pages/favTrees";

import { Login } from "./Pages/login";
import Home from "./Pages/home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/demo" component={FavTrees} />
      </Switch>
    </Router>
  );
};

export default App;
