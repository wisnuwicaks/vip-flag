import React from "react";
import "./Login.css";
import LogoCimb from "../../../assets/logo-cimb.png";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";

class Login extends React.Component {
  render() {
    return (
      <div className="row" style={{ paddingTop: "11%" }}>
        <div className="col"></div>
        <div className="col p-5 login-container">
          <img width="70%" src={LogoCimb} alt="" />
          <InputUI
            className="mt-4"
            style={{ width: "90%" }}
            placeholder="Username"
          />
          <InputUI
            className="mt-4"
            style={{ width: "90%" }}
            placeholder="Password"
          />
          <p className="mt-3 content-sm">Forget Password</p>
          <ButtonUI className="mt-1 ">Sign In</ButtonUI>
        </div>
        <div className="col"></div>
      </div>
    );
  }
}
export default Login;
