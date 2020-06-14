import React from "react";
import "./Login.css";
import LogoCimb from "../../../assets/logo-cimb.png";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginHandler } from "../../../redux/actions";
import Cookies from "universal-cookie";

class Login extends React.Component {
  state = {
    isLogin: false,
    username: "",
    password: "",
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  inputHandler = (e, field) => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      [field]: value,
    });
  };

  onLoginHandler = () => {
    let newData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.onLogin(newData);
    console.log(newData);
  };
  render() {
    if (this.props.user.userId > 0) {
      alert(this.props.user.userId);
      return <Redirect to="/home" />;
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

            <Link to="/welcome">
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
