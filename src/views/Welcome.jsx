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
          <div className="" style={{ height: "480px" }}>
            <img
              src="https://i.ibb.co/cLSKgJd/background-1-crop.png"
              alt=""
              width="100%"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="" style={{ height: "480px" }}>
            <img
              src="https://i.ibb.co/cLSKgJd/background-1-crop.png"
              alt=""
              // height="800px"
              // style={{position:"fixed"}}
              width="100%"
            />
          </div>
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
        <div className="main-body">{this.bodyRender()}</div>
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
