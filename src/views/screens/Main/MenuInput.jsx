import React, { Component } from "react";
import "./Main.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";

class MenuInput extends Component {
  render() {
    return (
      <>
        <div className="main-body-input" id="import">
          <div style={{ flex: "1" }}>Import data</div>
          <div style={{ flex: "9" }}>
            <InputUI />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <ButtonUI className="m-3">Upload</ButtonUI>
          <ButtonUI type="outline" className="m-3">
            Cancel
          </ButtonUI>
        </div>
      </>
    );
  }
}

export default MenuInput;
