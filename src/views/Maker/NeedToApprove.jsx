import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ButtonUI from "../components/Button/Button";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";

import * as XLSX from "xlsx";

class NeedToApprove extends Component {
  state = {
    file: [],
    detailFile: [],
  };
  componentDidMount() {
    this.getFile();
  }

  getFile = () => {
    Axios.get(`${API_URL}/files/null_status/${this.props.user.userId}/`)
      .then((res) => {
        this.setState({ file: res.data });
      })
      .catch((err) => {
        console.log("ini err");

        console.log(err);
      });
  };

  detailBtnHander = (val) => {
    // var req = new XMLHttpRequest();
    // req.open("GET", val.linkDirectory, true);
    // req.responseType = "arraybuffer";

    // req.onload = function (e) {
    //   var data = new Uint8Array(req.response);
    //   var wb = XLSX.read(data, { type: "array" });
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   /* Convert array of arrays */
    //   const read = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //   /* Update state */
    //   console.log(read);
    //   // console.log(workbook);
    // };

    // req.send();



    var oReq = new XMLHttpRequest();
    oReq.open("GET",  val.linkDirectory, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);

        var arr = new Array();
        for (var i = 0; i != data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
        }

        var bstr = arr.join("");

        var cfb = XLSX.read(bstr, { type: 'binary' });

        cfb.SheetNames.forEach(function(sheetName, index) {

            // Obtain The Current Row As CSV
            var fieldsObjs = XLSX.utils.sheet_to_json(cfb.Sheets[sheetName]);
            console.log(fieldsObjs);
            // setState({detailFile:fieldsObjs})

        });
    }

    oReq.send();
  };

  approveBtnHandler = (val) => {
    Axios.post(`${API_URL}/cifapprove/file/${this.props.user.userId}`, val)
      .then((res) => {
        console.log(res.data);
        swal("Approval Succes", "Thankyou", "success");
        this.storeDataToTable(val)

        this.getFile();
      })
      .catch((err) => {
        console.log("ini err approve");

        console.log(err);
      });
  };

  storeDataToTable = (val)=>{
    var oReq = new XMLHttpRequest();
    oReq.open("GET",  val.linkDirectory, true);
    oReq.responseType = "arraybuffer";
    let arrDetail = []

    oReq.onload = function(e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);

        var arr = new Array();
        for (var i = 0; i != data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
        }

        var bstr = arr.join("");

        var cfb = XLSX.read(bstr, { type: 'binary' });
        cfb.SheetNames.forEach((sheetName, index)=> {

            // Obtain The Current Row As CSV
            var fieldsObjs = XLSX.utils.sheet_to_json(cfb.Sheets[sheetName]);
            console.log(fieldsObjs);
    //         arrDetail = [...arrDetail,fieldsObjs]
    //         alert("123")
    // console.log(arrDetail);

            Axios.post(`${API_URL}/cifapprove/cif_storetable`, fieldsObjs)
            .then((res) => {
              console.log(res.data);
              swal("Insert to table", "File Has been Rejected", "success");
         
            })
            .catch((err) => {
              console.log("ini err reject");
      
              console.log(err);
            });
      

        });
        
    }

    oReq.send();

  }

  rejectBtnHandler = (val) => {
    Axios.post(`${API_URL}/files/reject/${val.fileId}`)
      .then((res) => {
        console.log(res.data);
        swal("Reject Success", "File Has been Rejected", "success");
        this.getFile();
      })
      .catch((err) => {
        console.log("ini err reject");

        console.log(err);
      });
  };
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
            <td>{val.createdBy}</td>
            <td>{val.approvedBy}</td>
            <td>{val.createdDate}</td>
            <td>{val.approvalDate}</td>
            <td>
              {val.approvalStatus == "" ? "No Status" : val.approvalStatus}
            </td>
            <td>
              <ButtonUI type="text" onClick={() => this.storeDataToTable(val)}>
                Detail
              </ButtonUI>
            </td>

            {val.approvalStatus ? null : (
              <>
                <td>
                  <ButtonUI
                    type="contain"
                    onClick={() => this.approveBtnHandler(val)}
                  >
                    Approve
                  </ButtonUI>
                </td>
                <td>
                  <ButtonUI
                    type="outline"
                    onClick={() => this.rejectBtnHandler(val)}
                  >
                    Reject
                  </ButtonUI>
                </td>
              </>
            )}
          </tr>
        </>
      );
    });
  };
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Approve</h5>
        </div>
        <div className="main-body">
          <div className="main-body-show-body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <td>No</td>
                  <td>File Name</td>
                  <td>CreatedBy</td>
                  <td>ApprovedBy</td>
                  <td>Created Date</td>
                  <td>Approval Date</td>
                  <td>Approval Status</td>
                  <td colSpan="3" className="text-center">
                    Action
                  </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(NeedToApprove);
