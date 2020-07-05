import React, { Component } from "react";
import "./Main.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";

class MenuUploadData extends Component {
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Upload Data</h5>
        </div>
        <div className="main-body">
          <div className="main-body-input" id="import">
            <div style={{ flex: "1" }}>Import data</div>
            <div style={{ flex: "9" }}>
              {/* <InputUI /> */}
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file
                  </label>
                </div>
              </div>
            </div>
            {/* <div style={{ flex: "1" }}> */}
            {/* <ButtonUI className="m-3">Browse</ButtonUI> */}
            {/* </div> */}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <ButtonUI className="m-3">Upload</ButtonUI>
            <ButtonUI type="outline" className="m-3">
              Cancel
            </ButtonUI>
          </div>
        </div>
      </>
    );
  }
}

export default MenuUploadData;
