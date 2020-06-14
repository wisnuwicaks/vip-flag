import React, { Component } from "react";
import "./Main.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";
import Table from "react-bootstrap/Table";

class Main extends Component {
  state = {
    menuOption: "",
  };
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Title</h5>
        </div>
        <div className="main-body">
          {this.state.menuOption === "input data" ? (
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
          ) : (
            <>
              {/* <div className="main-body-show-head">
                <div className="mr-3">Export data</div>
                <div className="mr-3">
                  <InputUI />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <ButtonUI className="m-1">Export</ButtonUI>
                  <ButtonUI type="outline" className="m-1">
                    Cancel
                  </ButtonUI>
                </div>
              </div> */}
              <div className="main-body-show-body">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Column Name</td>
                      <td>Column Name</td>
                      <td>Column Name</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Data</td>
                      <td>Data</td>
                      <td>Data</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Data</td>
                      <td>Data</td>
                      <td>Data</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Data</td>
                      <td>Data</td>
                      <td>Data</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Data</td>
                      <td>Data</td>
                      <td>Data</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="main-body-show-foot">
                <ButtonUI className="m-3">Save</ButtonUI>
                <ButtonUI type="outline" className="m-3">
                  Cancel
                </ButtonUI>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Main;
