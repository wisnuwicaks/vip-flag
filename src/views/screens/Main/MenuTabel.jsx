import React, { Component } from "react";
import "./Main.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";
import Table from "react-bootstrap/Table";

class MenuTabel extends Component {
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Title</h5>
        </div>
        <div className="main-body">
          <div className="main-body-show-body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <td>#</td>
                  <td>CIF Number</td>
                  <td>VIP Code</td>
                  <td>Sub VIP</td>
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
        </div>
      </>
    );
  }
}

export default MenuTabel;
