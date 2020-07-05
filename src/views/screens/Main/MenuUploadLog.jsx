import React, { Component } from "react";
import "./Main.css";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap"

class MenuUploadLog extends Component {
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Upload Log</h5>
        </div>
        <div className="main-body">
          <div className="main-body-show-body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <td>No</td>
                  <td>Upload File Name</td>
                  <td>Upload Time</td>
                  <td>Status</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>File 1</td>
                  <td>2020-06-12 11:00:00</td>
                  <td>Success</td>
                  <td><Button className="btn-danger">View Data</Button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>File 2</td>
                  <td>2020-06-13 10:30:05</td>
                  <td>Fail</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>File 2</td>
                  <td>2020-06-13 10:33:45</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>File 3</td>
                  <td>2020-06-14 12:05:30</td>
                  <td>Success</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}

export default MenuUploadLog;
