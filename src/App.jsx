import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Login from "./views/screens/Login/Login";
import NavbarUI from "./views/components/Navbar/NavbarUI";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";

import { connect } from "react-redux";
import Cookie from "universal-cookie";

import { userKeepLogin, cookieChecker } from "./redux/actions";
import Welcome from "./views/screens/Main/Welcome";
import MenuUpload from "./views/screens/Main/MenuUpload";
import MenuUploadLog from "./views/screens/Main/MenuUploadLog";
import MenuApprovalStatus from "./views/screens/Main/MenuApprovalStatus";
import MenuApproval from "./views/screens/Main/MenuApproval";
import ViewUser from "./views/screens/Main/ViewUser";
import MenuApprovalLog from "./views/screens/Main/MenuApprovalLog";
import CreateUser from "./views/screens/Main/CreateUser";
import Sidebar from "./views/screens/Sidebar/Side";

const cookie = new Cookie();

class App extends Component {
  componentDidMount() {
    let cookieResult = cookie.get("authData");
    if (cookieResult) {
      console.log(cookieResult);
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  componentDidUpdate() {
    if (this.props.user.userId) {
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  adminRoutes = () => {
    if (this.props.user.userRole["roleName"] === "admin") {
      return (
        <>
          <Route exact path="/viewuser" component={ViewUser} />
          <Route exact path="/createuser" component={CreateUser} />
        </>
      );
    }
  };

  userRoutes = () => {
    if (
      this.props.user.userId &&
      this.props.user.userRole["roleName"] === "maker"
    ) {
      return (
        <>
          {/* <Route exact path="/welcome" component={Welcome} /> */}
          <Route exact path="/upload/log" component={MenuUploadLog} />
          <Route exact path="/upload" component={MenuUpload} />
          <Route exact path="/approval/status" component={MenuApprovalStatus} />
        </>
      );
    } else {
      return (
        <>
          {/* <Route exact path="/welcome" component={Welcome} /> */}
          <Route exact path="/approval" component={MenuApproval} />
          <Route exact path="/approval/log" component={MenuApprovalLog} />
        </>
      );
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      // alert("asdsa")
      return (
        <>
          {this.props.user.userId > 0 ? (
            <>
              <NavbarUI />
              <div className="row">
                <div className="col-2 pr-2">
                  <Sidebar />
                </div>
                <div className="col pl-0">
                  <Switch>
                    <Route exact path="/welcome" component={Welcome} />
                    {this.userRoutes()}
                    {this.adminRoutes()}
            
                    <Route exact path="*" component={PageNotFound} />
                  </Switch>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* <Redirect to="/" /> */}
              <Login/>
              {/* <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="*" component={PageNotFound} />
              </Switch> */}
            </>
          )}
        </>
      );
    } else {
      return <div>Loadingggg ...</div>;
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
