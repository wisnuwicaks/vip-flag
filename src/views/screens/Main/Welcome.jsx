import React from "react";
import "./Main.css";
import { loginHandler } from "../../../redux/actions";
import { connect } from "react-redux";
import Cookie from "universal-cookie";

class Welcome extends React.Component {
// componentDidMount(){
//   alert("welcome")
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
