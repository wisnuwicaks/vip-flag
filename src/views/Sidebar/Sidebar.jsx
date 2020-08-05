import React from "react";
import "./Sidebar.css";
import ButtonUI from "../components/Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sidebarActive } from "../../redux/actions";

class Sidebar extends React.Component {
  state = {
    user_role: "maker",
  };

  render() {
    return (
      <>
        <div className="sb-header text-center">
          <h5>User Menu</h5>
        </div>
        <div className="sb-body">
          {this.props.user.userRole["roleName"] === "admin" ? (
            <>
              <Link to="/viewuser">
                <ButtonUI
                  type="text"
                  onClick={() => this.props.sidebarActive("viewuser")}
                  className={
                    this.props.user.menuActive == "viewuser"
                      ? "menuActive"
                      : null
                  }
                >
                  View user
                </ButtonUI>
              </Link>
              <Link to="/audittrail">
                <ButtonUI
                  type="text"
                  onClick={() => this.props.sidebarActive("audittrail")}
                  className={
                    this.props.user.menuActive == "audittrail"
                      ? "menuActive"
                      : null
                  }
                >
                  Audit Trail
                </ButtonUI>
              </Link>
              <Link to="/createuser">
                <ButtonUI
                  type="text"
                  onClick={() => this.props.sidebarActive("createuser")}
                  className={
                    this.props.user.menuActive == "createuser"
                      ? "menuActive"
                      : null
                  }
                >
                  Create user
                </ButtonUI>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/upload"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ButtonUI
                  onClick={() => this.props.sidebarActive("uploadData")}
                  type="text"
                  className={
                    this.props.user.menuActive == "uploadData"
                      ? "menuActive"
                      : null
                  }
                >
                  Upload Data
                </ButtonUI>
              </Link>
              <Link
                to="/upload/log"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ButtonUI
                  onClick={() => this.props.sidebarActive("uploadLog")}
                  type="text"
                  className={
                    this.props.user.menuActive == "uploadLog"
                      ? "menuActive"
                      : null
                  }
                >
                  Upload Log
                </ButtonUI>
              </Link>
              <Link to="/approval">
                <ButtonUI
                  onClick={() => this.props.sidebarActive("approval")}
                  type="text"
                  className={
                    this.props.user.menuActive == "approval"
                      ? "menuActive"
                      : null
                  }
                >
                  Approval
                </ButtonUI>
              </Link>
              <Link to="/cifreport">
                <ButtonUI
                  onClick={() => this.props.sidebarActive("cifReport")}
                  type="text"
                  className={
                    this.props.user.menuActive == "cifReport"
                      ? "menuActive"
                      : null
                  }
                >
                  CIF Report
                </ButtonUI>
              </Link>
              <Link to="/chart">
                <ButtonUI
                  onClick={() => this.props.sidebarActive("chartReport")}
                  type="text"
                  className={
                    this.props.user.menuActive == "chartReport"
                      ? "menuActive"
                      : null
                  }
                >
                  Chart Report
                </ButtonUI>
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
    cif: state.cifData,
  };
};

const mapDispatchToProps = {
  sidebarActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
