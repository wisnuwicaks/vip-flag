import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./views/screens/Home/Home";
import Sidebar from "./views/screens/Sidebar/sidebar";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sidebar" component={Sidebar} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
