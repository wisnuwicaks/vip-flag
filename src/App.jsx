import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./views/screens/Home/Home";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
