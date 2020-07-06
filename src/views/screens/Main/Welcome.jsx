import React from "react";
import "./Main.css";
import { loginHandler } from "../../../redux/actions";
import { connect } from "react-redux";
import Cookie from "universal-cookie";

class Welcome extends React.Component {
  componentDidMount() {
    // console.log("idku :"+this.props.user.id);
    if (this.props.user.id) {
      // alert("masuk");
      const cookie = new Cookie();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  // componentDidUpdate() {
  //   console.log("idku :"+this.props.user.id);
  //   if (this.props.user.id) {
  //     alert("masuk");
  //     const cookie = new Cookie();
  //     cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
  //   }
  // }
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Welcome {this.props.user.username}</h5>
        </div>
        <div className="main-body"></div>
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
