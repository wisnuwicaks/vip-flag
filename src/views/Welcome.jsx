import React from "react";
import "./Main.css";
import { loginHandler } from "../redux/actions";
import { connect } from "react-redux";
import Cookie from "universal-cookie";

class Welcome extends React.Component {
  // componentDidMount(){
  //   alert("welcome")
  // }
  bodyRender = () => {
    if (this.props.user.userRole["roleName"] === "admin") {
      return (
        <>
          <h6>Selamat Datang di halaman Admin</h6>
        </>
      );
    } else if (this.props.user.userRole["roleName"] === "maker") {
      return (
        <>
          <h6>Selamat Datang di halaman Maker</h6>
        </>
      );
    } else {
      return (
        <>
          <h6>Selamat Datang di halaman Checker</h6>
        </>
      );
    }
  };
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Welcome {this.props.user.username}</h5>
        </div>
        <div className="main-body p-4">
          {this.bodyRender()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  onLogin: loginHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
