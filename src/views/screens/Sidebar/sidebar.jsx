import React from "react";
import "./sidebar.css";
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
              {/* Menu for creator */}
              <ButtonUI type="text">Waiting for approval</ButtonUI>
              <ButtonUI type="text">Approval Log</ButtonUI>
            </>
          ) : (
            <>
              {/* menu for checker */}
              <Link to="/input">
                <ButtonUI type="text">Upload Data</ButtonUI>
              </Link>
              {/* Upload data: mainnya tampil untuk import data */}
              <ButtonUI type="text">Upload Log</ButtonUI>
              <ButtonUI type="text">Approval Status</ButtonUI>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Sidebar;
