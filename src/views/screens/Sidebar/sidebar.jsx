import React from "react";
import "./sidebar.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h3>Actions</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
