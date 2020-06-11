import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./views/screens/Login/Login";
// import NavbarUI from "./views/components/Navbar/NavbarUI";
import Home from "./views/screens/Home/Home";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";

class App extends Component {
  render() {
    return (
      <>
        {/* <NavbarUI /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
