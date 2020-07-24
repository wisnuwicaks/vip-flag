import React, { Component } from "react";
import "../Main.css";
import InputUI from "../components/Input/Input";
import ButtonUI from "../components/Button/Button";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import Table from "react-bootstrap/Table";
import {API_URL} from "../../constants/API"
import Axios from "axios";
import swal from "sweetalert";

import "./MakerUpload.css"
class MenuUpload extends Component {
  state = {
    selectedFile: null,
    cols: [],
    rows: [],
    data: [],
    cifToUpload :[],
    invalidData :[]
  };

  // fileUploadHandler = (e) => {
  //   this.setState({ selectedFile: e.target.files[0] });
  //   console.log(this.state.selectedFile);
  // };

  fileUploadHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log(fileObj);

    let fileType = fileObj.name.substring(fileObj.name.lastIndexOf(".") + 1);
    if (fileType !== "xlsx") {
      return alert("extensi file tidak sesuai");
    }
    
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          data: resp.rows,
        });
      }
    });
  };

  uploadBtnHandler = ()=>{
    const {data, cifToUpload} = this.state
    let cifObj = {}
    let arrObj = []
      
    for (let rowArr of data) {
      if (data.indexOf(rowArr) !==0) {
        arrObj = [...arrObj,{
          cfcifn:rowArr[0],
          cfvipi:rowArr[1],
          cfvipc:rowArr[2],
        }]
    }
    }
    this.setState({cifToUpload:arrObj})
    Axios.post(`${API_URL}/cifchecksum/post_data`,arrObj)
    .then(res=>{
      console.log(res.data);
      swal("Success Upload","Thankyou","success")
    })
    .catch(err=>{
      console.log(err);
      
    })
  }
  renderUploadData = () => {
    const { data, invalidData } = this.state;
    let arr = [1, , 3];
    let arrBaru = [...data];
    let invalidDataTemp =[]
    
    for (let rowArr of arrBaru) {
      for (let cel of rowArr) {
        if (cel == undefined) {
          arrBaru[arrBaru.indexOf(rowArr)][
            rowArr.findIndex((cel) => cel == undefined)
          ] = "Invalid/Empty row";
          invalidDataTemp.push(rowArr)
          this.setState({invalidData:invalidDataTemp})
        }
      }
    }

    console.log("ini arr baru");

    console.log(arrBaru);

    return arrBaru.map((val, idx, arr) => {
      if (idx === 0) {
        return (
          <tr>
            {val.map((val) => {
              return <th className="table">{val}</th>;
            })}
         
          </tr>
        );
      } else {
        return (
          <tr>
            {val.map((val, index) => {
              return <td>{val}</td>;
            })}
          </tr>
        );
      }
    });
  };

  renderDataInvalid =()=>{
    const { data, invalidData } = this.state;
    return invalidData.map((val, idx, arr) => {

        return (
          <tr>
            {val.map((val, index) => {
              return (
                <>
              <td>{val}</td>
              </>
              );
            })}
           
          </tr>
        );
      
    });
  }

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
              <div className="input-group">
                <div className="custom-file">
                  <input
                    onChange={(e) => this.fileUploadHandler(e)}
                    type="file"
                    accept=".xlsx"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    {this.state.selectedFile
                      ? this.state.selectedFile.name
                      : null}
                  </label>
                </div>
              </div>
            </div>
          </div>
 
          <div style={{ height: "400px", overflow: "auto", padding:"20px" }}>
          <Table striped bordered hover responsive style={{position:"relative"}}>
            <tbody >{this.renderUploadData()}</tbody>
          </Table>
          </div>
          <div style={{ height: "300px", overflow: "auto", padding:"20px" }}>
          <Table striped bordered hover responsive>
            <tbody>{this.renderDataInvalid()}</tbody>
          </Table>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <ButtonUI 
            onClick={this.uploadBtnHandler}
            className="m-3">Upload</ButtonUI>
            <ButtonUI type="outline" className="m-3">
              Cancel
            </ButtonUI>
          </div>
        </div>
      </>
    );
  }
}

export default MenuUpload;
