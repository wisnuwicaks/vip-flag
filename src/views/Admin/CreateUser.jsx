import React from "react";
import "../../views/Main.css";
import { FormGroup, Label, Input } from "reactstrap";
import ButtonUI from "../components/Button/Button";
import InputUI from "../components/Input/Input";
import { registerHandler,loginHandler } from "../../redux/actions";
import {connect} from "react-redux"

class CreateUser extends React.Component {
  state = {
    registerForm: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: "user",

    },
  };

  clearInput = ()=>{
    
    this.setState({registerForm:
      {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "user",
     
      }
    })
  }

  
  addUserBtnHandler = ()=>{
    
    const {firstName,lastName,username,password,role} = this.state.registerForm
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     if (password.match(strongRegex)){
    this.props.registerHandler(this.state.registerForm)
      } else {
      alert("Please Change password")
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

  render() {
    return (
      <>
        <div className="main-header">
          <h5>Create User</h5>
        </div>
        <div className="main-body">
          <div className="container">
            <div className="main-body-input">
              <div style={{ flex: "1" }}>First Name</div>
              <div style={{ flex: "6" }}>
                <div className="custom-file row">
                  <InputUI
                  value={this.state.registerForm["firstName"]}
                    onChange={(e) =>
                      this.inputHandler(e, "firstName", "registerForm")
                    }
                    placeholder="First Name"
                  ></InputUI>
                </div>
              </div>
              <div style={{ flex: "1" }}>Last Name</div>
              <div style={{ flex: "6" }}>
                <div className="custom-file row">
                  <InputUI
                  value={this.state.registerForm["lastName"]}

                    onChange={(e) =>
                      this.inputHandler(e, "lastName", "registerForm")
                    }
                    placeholder="Last Name"
                  ></InputUI>
                </div>
              </div>
            </div>
            <div className="main-body-input">
              <div style={{ flex: "2" }}>Username</div>
              <div style={{ flex: "6" }}>
                <div className="custom-file row">
                  <InputUI
                  value={this.state.registerForm["username"]}

                    onChange={(e) =>
                      this.inputHandler(e, "username", "registerForm")
                    }
                    placeholder="Username"
                  ></InputUI>
                </div>
              </div>
              <div style={{ flex: "2" }}>Password</div>
              <div style={{ flex: "6" }}>
                <div className="custom-file row">
                  <InputUI
                  value={this.state.registerForm["password"]}

                    onChange={(e) =>
                      this.inputHandler(e, "password", "registerForm")
                    }
                    placeholder="Password"
                  ></InputUI>
                </div>
              </div>
            </div>

            <div className="main-body-input w-50">
              <div style={{ flex: "1" ,alignItems:"center"}}>Role</div>
              <div style={{ flex: "9" }}>
                <FormGroup>
                  <Input
                  size="sm"
                    onChange={(e) =>
                      this.inputHandler(e, "role", "registerForm")
                    }
                    type="select"
                    name="select"
                    id="exampleSelect"
                  >
                    <option value="user">user</option>
                    <option value="admin">Admin</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
            <div className="row justify-content-center">
              <ButtonUI 
              onClick={this.addUserBtnHandler}
              className="m-3">Add User</ButtonUI>
              <ButtonUI 
              onClick={()=>this.clearInput()}
              type="outline" className="m-3">
                Clear
              </ButtonUI>
            </div>
          </div>
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
  loginHandler,
  registerHandler

};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
