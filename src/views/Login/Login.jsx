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
    this.props.onLogin(userData);
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

// import React from "react";
// import "./changePassword.css";
// import LogoCimb from "../../assets/logo-cimb.png";
// import InputUI from "../components/Input/Input";
// import ButtonUI from "../components/Button/Button";
// import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { loginHandler } from "../../redux/actions";
// import Cookie from "universal-cookie";
// import swal from "sweetalert"
// import Axios from "axios";
// import { API_URL } from "../../constants/API";

// const cookie = new Cookie();

// class Login extends React.Component {
//   state = {
//     changePasswordForm: {
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword:""
//   }
// }


//   inputHandler = (e, field) => {
//     const { value } = e.target;
//     this.setState({
//       ...this.state,
//       [field]: value,
//     });
//   };


//   changePasswordHandler = () => {
//     const {
//       oldPassword,
//       newPassword,
//       confirmPassword
//     } = this.state.changePasswordForm;

//     if (newPassword == confirmPassword) {
//       Axios.post(`${API_URL}/user/changePassword`, this.state.profileList, {
//         params: {
//           oldPass: oldPassword,
//           newPass: newPassword,
//         },
//       })
//         .then((res) => {
//           console.log("berhasil");
//           swal(
//             "Password Changed",
//             "Your password has been successfully changed, please relogin",
//             "success"
//           );
//           this.props.onLogout();
//           console.log(res.data);
//         })
//         .catch((err) => {
//           this.state.changePasswordForm.oldPassword = "";
//           this.state.changePasswordForm.newPassword = "";
//           alert("GAGAL kesalahan sistem");
//           console.log(err);
//         });
//     } else {
//       alert("Password tidak cocok");
//     }
//   };
  
//   render() {
//     if (this.props.user.userId > 0) {

//       alert(this.props.user.userId);
//       return <Redirect to="/welcome" />;
//     } else {
//       return (
//         <div className="row" style={{ paddingTop: "11%" }}>
//           <div className="col"></div>
//           <div className="col p-5 login-container">
//             <img width="70%" src={LogoCimb} alt="" />
//             <InputUI
//               value={this.state.oldPassword}
//               className="mt-4"
//               style={{ width: "90%" }}
//               placeholder="Old Password"
//               onChange={(e) => this.inputHandler(e, "oldPassword")}
//             />
//             <InputUI
//               value={this.state.newPassword}
//               className="mt-4"
//               style={{ width: "90%" }}
//               placeholder="newPassword"
//               onChange={(e) => this.inputHandler(e, "newPassword")}
//             />
//              <InputUI
//               value={this.state.confirmPassword}
//               className="mt-4"
//               style={{ width: "90%" }}
//               placeholder="Confirm Password"
//               onChange={(e) => this.inputHandler(e, "confirmPassword")}
//             />
//               <ButtonUI className="mt-1 " onClick={this.changePasswordHandler}>
//                 Change Password
//               </ButtonUI>
         
//           </div>
//           <div className="col"></div>
//         </div>
//       );
//     }
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };
// const mapDispatchToProps = {
//   onLogin: loginHandler,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Login);


// BACKEND
// @PostMapping("/changePassword")
// public User changePassword(@RequestBody User user, @RequestParam("oldPass") String oldPass,@RequestParam("newPass") String newPass){
//     User findUser = userRepo.findById(user.getUserId()).get();
//     System.out.println(oldPass);
//     System.out.println(newPass);
//     if (pwEncoder.matches(oldPass, findUser.getPassword())) {
//         System.out.println("masuk");
//         String newPassEncoded = pwEncoder.encode(newPass);
//         findUser.setPassword(newPassEncoded);
//         userRepo.save(findUser);
//         return findUser;
//     }
//     throw new RuntimeException("Wrong old password!");
// }
