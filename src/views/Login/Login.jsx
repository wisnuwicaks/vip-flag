import React from "react";
import "./Login.css";
import LogoCimb from "../../assets/logo-cimb.png";
import InputUI from "../components/Input/Input";
import ButtonUI from "../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginHandler } from "../../redux/actions";
import Cookie from "universal-cookie";

const cookie = new Cookie();

class Login extends React.Component {
  state = {
    isLogin: false,
    username: "",
    password: "",
  };

 

  inputHandler = (e, field) => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      [field]: value,
    });
  };

  onLoginHandler = () => {
    let userData = {
      username: this.state.username,
      password: this.state.password,
    };
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    // var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])");

    // if (this.state.password.match(strongRegex)){
      this.props.onLogin(userData);
    // } else {
    //   alert("Please Change password")
    // }
  };

  render() {
    if (this.props.user.userId > 0) {

      alert(this.props.user.userId);
      return <Redirect to="/welcome" />;
    } else {
      return (
        <div className="row" style={{ paddingTop: "11%" }}>
          <div className="col"></div>
          <div className="col p-5 login-container">
            <img width="70%" src={LogoCimb} alt="" />
            <InputUI
              value={this.state.username}
              className="mt-4"
              style={{ width: "90%" }}
              placeholder="Username"
              onChange={(e) => this.inputHandler(e, "username")}
            />
            <InputUI
              value={this.state.password}
              className="mt-4"
              style={{ width: "90%" }}
              placeholder="Password"
              onChange={(e) => this.inputHandler(e, "password")}
            />
            <p className="mt-3 content-sm">Forget Password</p>

            <Link
              to="/welcome"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ButtonUI className="mt-1 " onClick={this.onLoginHandler}>
                Sign In
              </ButtonUI>
            </Link>
          </div>
          <div className="col"></div>
        </div>
      );
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
