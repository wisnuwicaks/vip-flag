import React from "react";
// import "./changePassword.css";
import LogoCimb from "../../assets/logo-cimb.png";
import InputUI from "../components/Input/Input";
import ButtonUI from "../components/Button/Button";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginHandler,logoutHandler } from "../../redux/actions";
import Cookie from "universal-cookie";
import swal from "sweetalert"
import Axios from "axios";
import { API_URL } from "../../constants/API";

const cookie = new Cookie();

class ChangePassword extends React.Component {
  state = {
    changePasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword:""
  }
}


inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  changePasswordHandler = () => {
    const {
      oldPassword,
      newPassword,
      confirmPassword
    } = this.state.changePasswordForm;

    let userId = {
        userId : this.props.user.userId
    }
    if (newPassword == confirmPassword) {
      Axios.post(`${API_URL}/users/changePassword`,userId, {
        params: {
          oldPass: oldPassword,
          newPass: newPassword,
        },
      })
        .then((res) => {
          console.log("berhasil");
          swal(
            "Password Changed",
            "Your password has been successfully changed, please relogin",
            "success"
          );
          this.props.onLogout();
          console.log(res.data);
        })
        .catch((err) => {
        //   this.state.changePasswordForm.oldPassword = "";
        //   this.state.changePasswordForm.newPassword = "";
          alert("GAGAL kesalahan sistem");
          console.log(err);
        });
    } else {
      alert("Password tidak cocok");
    }
  };
  
  render() {
  
      return (
        <div className="row" style={{ paddingTop: "11%" }}>
          <div className="col"></div>
          <div className="col p-5 login-container">
            <img width="70%" src={LogoCimb} alt="" />
            <InputUI
              value={this.state.oldPassword}
              className="mt-4"
              style={{ width: "90%" }}
              placeholder="Old Password"
              onChange={(e) => this.inputHandler(e, "oldPassword","changePasswordForm")}
            />
            <InputUI
              value={this.state.newPassword}
              className="mt-4"
              style={{ width: "90%" }}
              placeholder="New Password"
              onChange={(e) => this.inputHandler(e, "newPassword","changePasswordForm")}
            />
             <InputUI
              value={this.state.confirmPassword}
              className="mt-4"
              style={{ width: "90%" }}
              placeholder="Confirm Password"
              onChange={(e) => this.inputHandler(e, "confirmPassword","changePasswordForm")}
            />
              <ButtonUI className="mt-3" onClick={this.changePasswordHandler}>
                Change Password
              </ButtonUI>
         
          </div>
          <div className="col"></div>
        </div>
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
  onLogout: logoutHandler,

};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);


