import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ButtonUI from "../../views/components/Button/Button";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";


import * as XLSX from 'xlsx';

class CheckerToApprove extends Component {
  state = {
    file: [],
  };
  componentDidMount() {
    this.getFile();
  }



  getFile = () => {
    Axios.get(`${API_URL}/files/checker/${this.props.user.userId}/No`)
      .then((res) => {
        this.setState({ file: res.data });
      })
      .catch((err) => {
        console.log("ini err");

        console.log(err);
      });
  };


  detailBtnHander = (val)=>{
    var req = new XMLHttpRequest();
    req.open("GET", val.linkDirectory, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
      var data = new Uint8Array(req.response);
      var workbook = XLSX.read(data, {type:"array"});

    console.log(workbook);
    
    }

    req.send();
  }

  approveBtnHandler = (val)=>{
    Axios.post(`${API_URL}/files/approve/${val.fileId}`)
    .then((res) => {
      console.log(res.data);
      swal("Approval Succes", "Thankyou", "success");
      this.getFile()

    })
    .catch((err) => {
      console.log("ini err approve");

      console.log(err);
    });
  }

  rejectBtnHandler = (val)=>{
    Axios.post(`${API_URL}/files/reject/${val.fileId}`)
    .then((res) => {
      console.log(res.data);
      swal("Reject Success", "File Has been Rejected", "success");
      this.getFile()
    })
    .catch((err) => {
      console.log("ini err reject");

      console.log(err);
    });
  }
  renderLog = () => {
    const { file } = this.state;
    return file.map((val, idx) => {
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>
              <a href={val.linkDirectory}>{val.fileName}</a>
            </td>
            <td>{val.createdDate}</td>
            <td>{val.approvalDate}</td>
            <td>
              {val.approvalStatus=="No"?"No Status":null}
              </td>
            <td>
              <ButtonUI type="text" onClick={() => this.detailBtnHander(val)}>
                Detail
              </ButtonUI>
            </td>

            <td>
              <ButtonUI type="contain" onClick={() => this.approveBtnHandler(val)}>
                Approve
              </ButtonUI>
            </td>

            <td>
              <ButtonUI type="outline" onClick={() => this.rejectBtnHandler(val)}>
                Reject
              </ButtonUI>
            </td>
          </tr>
        </>
      );
    });
  };
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Checker File to Approve</h5>
        </div>
        <div className="main-body">
          <div className="main-body-show-body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <td>No</td>
                  <td>File Name</td>
                  <td>Created Date</td>
                  <td>Approval Date</td>
                  <td>Approval Status</td>
                  <td colSpan="3">Action</td>
                </tr>
              </thead>
              <tbody>{this.renderLog()}</tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckerToApprove);
