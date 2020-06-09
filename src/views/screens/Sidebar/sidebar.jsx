import React from "react";
import "./sidebar.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ height: "700px" }}>
          <div className="col-3">
            <div className></div>
            <div className="sb-header">
              <h5>Actions</h5>
            </div>
            <div className="sb-body">
              {/* Menu for creator */}
              <p>Waiting for approval</p>
              <p>Approval Log</p>

              {/* menu for checker */}
              <p>Create Data</p>
              <p>View Data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
