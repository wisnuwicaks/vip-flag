import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Login from "./views/screens/Login/Login";
import NavbarUI from "./views/components/Navbar/NavbarUI";
// import NavbarUI from "./views/components/Navbar/NavbarUI";
import Home from "./views/screens/Home/Home";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";

import { connect } from "react-redux";
import Cookie from "universal-cookie";

import { userKeepLogin, cookieChecker } from "./redux/actions";

const cookieObj = new Cookie();

class App extends Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData");
    if (cookieResult) {
      alert("asda")
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  adminRoutes = () => {
    if (this.props.user.role === "admin") {
      return <></>;
    } else {
      return <></>;
    }
  };

  userRoutes = () => {
    if (this.props.user.id && this.props.user.role == "user") {
      return (
        <>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="*" component={PageNotFound} />
        </>
      );
    } else {
      return <Redirect to="/pagenotfound" />;
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          {this.props.user.userId > 0 ? <NavbarUI /> : null}
          <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="*" component={PageNotFound} />
            {this.adminRoutes()}
            {this.userRoutes()}
          </Switch>
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
