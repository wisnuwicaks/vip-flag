import React from "react";
import "./Sidebar.css";
import ButtonUI from "../../components/Button/Button";

class Sidebar extends React.Component {
  state = {
    user_role: "checker",
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
              <ButtonUI type="text">Create Data</ButtonUI>
              <ButtonUI type="text">View Data</ButtonUI>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Sidebar;
