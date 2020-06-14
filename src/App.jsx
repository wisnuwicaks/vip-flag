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
import Sidebar from "./views/screens/Sidebar/Sidebar";
import Welcome from "./views/screens/Main/Welcome";
import MenuUploadData from "./views/screens/Main/MenuUploadData";
import MenuUploadLog from "./views/screens/Main/MenuUploadLog";
import MenuApprovalStatus from "./views/screens/Main/MenuApprovalStatus";
import MenuApproval from "./views/screens/Main/MenuApproval";

const cookieObj = new Cookie();

class App extends Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData");
    if (cookieResult) {
      alert(this.props.user.id);
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
    if (this.props.user.id && this.props.user.role === "user") {
      return (
        <>
          <Route exact path="/" component={Login} />
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
          {this.props.user.id > 0 ? (
            <>
              <NavbarUI />
              <div className="row">
                <div className="col-3 pr-2">
                  <Sidebar />
                </div>
                <div className="col pl-0">
                  <Switch>
                    <Route exact path="/welcome" component={Welcome} />
                    <Route exact path="/upload" component={MenuUploadData} />
                    <Route exact path="/upload/log" component={MenuUploadLog} />
                    <Route
                      exact
                      path="/approval/status"
                      component={MenuApprovalStatus}
                    />
                    <Route exact path="/approval" component={MenuApproval} />
                    <Route exact path="*" component={PageNotFound} />
                  </Switch>
                </div>
              </div>
              {/* <Switch>
                {this.adminRoutes()}
                {this.userRoutes()}
              </Switch> */}
            </>
          ) : (
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="*" component={PageNotFound} />
            </Switch>
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
