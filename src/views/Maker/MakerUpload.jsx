import React, { Component } from "react";
import "../Main.css";
import InputUI from "../components/Input/Input";
import ButtonUI from "../components/Button/Button";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import Table from "react-bootstrap/Table";
import { InputGroup, InputGroupAddon, Input, InputGroupText } from "reactstrap";
import Pagination from "react-bootstrap/Pagination";
import { Form } from "react-bootstrap";
import { API_URL } from "../../constants/API";
import { connect } from "react-redux";
import { cifDataState } from "../../redux/actions";
import Axios from "axios";
import swal from "sweetalert";

import "./MakerUpload.css";
class MakerUpload extends Component {
  state = {
    selectedFile: null,
    rows: [],
    data: [],
    activePage: 1,
    lastPage:"",
    cifToUpload: [],
    invalidData: [],
  };

  // fileUploadHandler = (e) => {
  //   this.setState({ selectedFile: e.target.files[0] });
  //   console.log(this.state.selectedFile);
  // };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({ activePage: parseInt(e.target.value) });
    }
  };

  fileUploadHandler = (event) => {
    this.setState({activePage:1})
    let fileObj = event.target.files[0];
    this.setState({ selectedFile: event.target.files[0] });
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

  uploadBtnHandler = () => {
    const { data, cifToUpload, selectedFile } = this.state;
    let cifObj = {};
    let arrObj = [];

    if (selectedFile == null) {
      return swal(
        "Select File First",
        "Browse file in your directory",
        "error"
      );
    }
    for (let rowArr of data) {
      if (data.indexOf(rowArr) !== 0) {
        arrObj = [
          ...arrObj,
          {
            cfcifn: rowArr[0],
            cfvipi: rowArr[1],
            cfvipc: rowArr[2],
          },
        ];
      }
    }
    this.setState({ cifToUpload: arrObj });
    this.props.cifDataState(arrObj);
    // Axios.post(`${API_URL}/cifchecksum/post_data`,arrObj)
    // .then(res=>{
    //   console.log(res.data);
    //   swal("Success Upload","Thankyou","success")
    // })
    // .catch(err=>{
    //   console.log(err);
    // })

    let formData = new FormData();

    formData.append("file", selectedFile, selectedFile.name);
    Axios.post(
      `${API_URL}/files/uploadExcelFile/${this.props.user.userId}`,
      formData
    )
      .then((res) => {
        console.log(res.data);
        this.setState({ selectedFile: null });
        this.setState({ data: [] });
        this.setState({ rows: [] });

        swal("Success Upload", "Thankyou", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderUploadData = () => {
    const { data, invalidData, activePage, selectedFile } = this.state;

    let arrBaru = [...data];
    let arrPage = [];
    let invalidDataTemp = [];

    for (let rowArr of arrBaru) {
      for (let cel of rowArr) {
        if (cel == undefined) {
          arrBaru[arrBaru.indexOf(rowArr)][
            rowArr.findIndex((cel) => cel == undefined)
          ] = "Invalid/Empty row";
          invalidDataTemp.push(rowArr);
          this.setState({ invalidData: invalidDataTemp });
        }
      }
    }

    console.log("ini arr baru");
    data.shift();
    console.log(arrBaru);
    if(selectedFile){
      // this.setState({lastPage:data.length/10})

    }
    let startIdx = activePage * 10 - 10;
    let lastIdx = activePage * 10 - 1;
    data.forEach((val, idx) => {
      if (idx >= startIdx && idx <= lastIdx) {
        arrPage.push(val);
      }
    });
    return arrPage.map((val, idx, arr) => {
      return (
        <tr>
          {val.map((val, index) => {
            return <td>{val}</td>;
          })}
        </tr>
      );
    });
  };

  renderDataInvalid = () => {
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
  };

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
          <div style={{ paddingLeft: "20px",paddingRight: "20px" }}>
            <Table className="tableWidth">
              {this.state.selectedFile ? (
                <thead>
                  <tr>
                    <th>CFCIFN</th>
                    <th>CFVIPI</th>
                    <th>CFVIPC</th>
                  </tr>
                </thead>
              ) : null}
            </Table>
          </div>
          <div
            style={{
              height: "400px",
              overflow: "auto",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Table className="tableWidth" striped bordered hover responsive>
              <tbody>{this.renderUploadData()}</tbody>
            </Table>
          </div>
          <div className="justify-content-center d-flex border">
            <Pagination>
              <Pagination.Prev
              onClick={()=>this.setState({activePage:this.state.activePage-1})}
              />

              <Pagination.Item>
                {/* <Form.Control 
                size="sm"
                // value={this.state.activePage}
                className="page"
                onKeyPress={(e) => this.handleKeyPress(e)}
                type="text" placeholder="page" 
                />  */}
                Page{" "}{ this.state.activePage} {" "} 
                <input
                  // value={this.state.activePage}
                  onKeyPress={(e) => this.handleKeyPress(e)}
                  className="page"
                  type=""
                  name=""
                  id=""
                />
                
              </Pagination.Item>

              <Pagination.Next 
              onClick={()=>this.setState({activePage:this.state.activePage+1})}
              
              />
            </Pagination>
          </div>
          {/* <div style={{ height: "300px", overflow: "auto", padding: "20px" }}>
            <Table striped bordered hover responsive>
              <tbody>{this.renderDataInvalid()}</tbody>
            </Table>
          </div> */}
          <div className="d-flex justify-content-center align-items-center">
            <ButtonUI onClick={this.uploadBtnHandler} className="m-3">
              Upload
            </ButtonUI>
            <ButtonUI type="outline" className="m-3">
              Cancel
            </ButtonUI>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cif: state.cifData,
  };
};

const mapDispatchToProps = {
  cifDataState,
};

export default connect(mapStateToProps, mapDispatchToProps)(MakerUpload);
