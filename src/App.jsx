import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Login from "./views/Login/Login";
import NavbarUI from "./views/components/Navbar/NavbarUI";
import PageNotFound from "./views/PageNotFound/PageNotFound";

import { connect } from "react-redux";
import Cookie from "universal-cookie";

import { userKeepLogin, cookieChecker } from "./redux/actions";
import Welcome from "./views/Welcome";
import MakerUpload from "./views/Maker/MakerUpload";
import FileUploaded from "./views/Maker/FileUploaded";
import FileApproved from "./views/Maker/FileApproved";
import NeedToApprove from "./views/Checker/NeedToApprove";
import CheckerApprovalLog from "./views/Checker/CheckerApprovalLog";

import ViewUser from "./views/Admin/ViewUser";
import CreateUser from "./views/Admin/CreateUser";
import Sidebar from "./views/Sidebar/Sidebar";

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

    if (this.props.user.userId && this.props.user.userRole["roleName"] === "admin") {
      return (
        <>
          <Route exact path="/viewuser" component={ViewUser} />
          <Route exact path="/createuser" component={CreateUser} />
        </>
      );
    }
    else{
      return null
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
          <Route exact path="/maker/upload" component={MakerUpload} />
          <Route exact path="/maker/upload/log" component={FileUploaded} />
          <Route exact path="/maker/approval/status" component={FileApproved} />
        </>
      );
    } else {
      return (
        <>
          {/* <Route exact path="/welcome" component={Welcome} /> */}
          <Route exact path="/checker/toApprove" component={NeedToApprove} />
          <Route exact path="/checker/approved" component={CheckerApprovalLog} />
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
                    {this.adminRoutes()}
                    {this.userRoutes()}
            
                    <Route exact path="*" component={PageNotFound} />
                  </Switch>
                </div>
              </div>
            </>
          ) : (
            <>

              <Login/>
      
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
