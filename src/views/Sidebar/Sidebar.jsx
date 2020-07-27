import React from "react";
import "./Sidebar.css";
import ButtonUI from "../components/Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Sidebar extends React.Component {
  state = {
    user_role: "maker",
  };

  render() {
    return (
      <>
        <div className="sb-header text-center">
          <h5>Actions</h5>
        </div>
        <div className="sb-body">
          {this.props.user.userRole["roleName"] === "admin" ? (
            <>
              <Link to="/viewuser">
                <ButtonUI type="text">View user</ButtonUI>
              </Link>
              <Link to="/createuser">
                <ButtonUI type="text">Create user</ButtonUI>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/upload"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ButtonUI type="text">Upload Data</ButtonUI>
              </Link>
              <Link
                to="/upload/log"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ButtonUI type="text">Upload Log</ButtonUI>
              </Link>
              <Link to="/approval">
                <ButtonUI type="text">Approval</ButtonUI>
              </Link>
              <Link to="/cifreport">
                <ButtonUI type="text">CIF Report</ButtonUI>
              </Link>

              {/* <>
                <Link to="/checker/toApprove">
                  <ButtonUI type="text">Waiting for approval</ButtonUI>
                </Link>
                <Link to="/checker/approved">
                  <ButtonUI type="text">Approval Log</ButtonUI>
                </Link>
              </> */}
            </>
          )}
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

export default connect(mapStateToProps)(Sidebar);
