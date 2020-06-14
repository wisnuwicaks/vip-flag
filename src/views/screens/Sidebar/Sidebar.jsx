import React from "react";
import "./Sidebar.css";
import ButtonUI from "../../components/Button/Button";
import { Link } from "react-router-dom";

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
          {this.state.user_role === "checker" ? (
            <>
              {/* Menu for maker */}
              <ButtonUI type="text">Waiting for approval</ButtonUI>
              <ButtonUI type="text">Approval Log</ButtonUI>
            </>
          ) : (
            <>
              {/* menu for checker */}
              <Link
                to="/upload"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ButtonUI type="text">Upload Data</ButtonUI>
              </Link>
              {/* Upload data: mainnya tampil untuk import data */}
              <Link
                to="/tabel"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ButtonUI type="text">Upload Log</ButtonUI>
              </Link>
              <ButtonUI type="text">Approval Status</ButtonUI>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Sidebar;
