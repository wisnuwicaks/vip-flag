import React, { Component } from "react";
import "../Main.css";
import "./MakerUpload.css";

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

class MakerUpload extends Component {
  state = {
    selectedFile: null,
    rows: [],
    data: [],
    activePage: 1,
    activePageInvalid: 1,

    lastPage: "",
    sameCif : [],
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
    this.setState({ activePage: 1 });
    this.setState({ invalidData: [] });
    let fileObj = event.target.files[0];

    this.setState({ selectedFile: event.target.files[0] });
    console.log(fileObj);
    let fileType = fileObj.name.substring(fileObj.name.lastIndexOf(".") + 1);
    if (fileType !== "xlsx") {
      return swal("Ekstensi File tidak Valid", "", "error");
    }
    //fungsi untuk baca excel
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          data: resp.rows,
        });
        this.invalidRowCheck();
      }
    });
  };

  invalidRowCheck = (dataToCheck) => {
    const { data } = this.state;
    let invalidIdxData = [];
    console.log(data);
    let arrNoHeader = [...data];
    arrNoHeader.shift();

    for (let rowArr of arrNoHeader) {
      for (let cel = 0; cel <= 2; cel++) {
        if (
          rowArr[cel] == undefined ||
          rowArr[cel].toString().split(" ").length > 1
        ) {
          arrNoHeader[arrNoHeader.indexOf(rowArr)][cel] = "Empty row";
          if (!invalidIdxData.includes(arrNoHeader.indexOf(rowArr))) {
            invalidIdxData.push(arrNoHeader.indexOf(rowArr));
            this.setState({ invalidData: invalidIdxData });
          }
        }
      }
      if (isNaN(rowArr[0]) ||rowArr[0].length>14  || !isNaN(rowArr[1]) || rowArr[1].length>1 || rowArr[2].length>1 ) {
        if (!invalidIdxData.includes(arrNoHeader.indexOf(rowArr))) {
          invalidIdxData.push(arrNoHeader.indexOf(rowArr));
          this.setState({ invalidData: invalidIdxData });
        }
        continue;
      }

      let duplicateCount = arrNoHeader.filter(val=>{

        return val[0]==rowArr[0]
      })
      console.log(duplicateCount);
      

      if(duplicateCount.length>1){
        if (!invalidIdxData.includes(arrNoHeader.indexOf(rowArr))) {
          invalidIdxData.push(arrNoHeader.indexOf(rowArr));
          this.setState({ invalidData: invalidIdxData });
        }
      }
    }
    console.log("row salah");
    console.log(invalidIdxData);
  };

  uploadBtnHandler = () => {
    const { data, cifToUpload, selectedFile, invalidData } = this.state;
    let cifObj = {};
    let arrObj = [];

    if (selectedFile == null) {
      return swal(
        "Select File First",
        "Browse file in your directory",
        "error"
      );
    }
    if (invalidData.length > 0) {
      return swal("Excel row not Valid", "Please check row format", "error");
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
      `${API_URL}/files/uploadExcelFile/${data.length - 1}/${
        this.props.user.userId
      }`,
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
    let arrPageIdx = [];

    arrBaru.shift();

    let startIdx = activePage * 10 - 10;
    let lastIdx = activePage * 10 - 1;

    return arrBaru.map((val, idx, arr) => {
      if (idx >= startIdx && idx <= lastIdx) {
        if (invalidData.includes(idx)) {
          return (
            // <tr className={invalidData.includes(idx)? "trInvalid":null}>
            <tr style={{ color: "red" }}>
              <td className="noTable">{idx + 1}</td>

              {val.map((val, index) => {
                return (
                  <>
                    <td>{val}</td>
                  </>
                );
              })}
            </tr>
          );
        }
        return (
          // <tr className={invalidData.includes(idx)? "trInvalid":null}>
          <tr>
            <td className="noTable">{idx + 1}</td>

            {val.map((val, index) => {
              return (
                <>
                  <td>{val}</td>
                </>
              );
            })}
          </tr>
        );
      }
    });
  };

  renderDataInvalid = () => {
    const { data, invalidData, activePageInvalid } = this.state;
    let arrRender = [...data];
    arrRender.shift();

    let startIdx = activePageInvalid * 10 - 10;
    let lastIdx = activePageInvalid * 10 - 1;

    return arrRender.map((val, idx, arr) => {
      if (invalidData.includes(idx)) {
      if (idx >= startIdx && idx <= lastIdx){
        return (
          <tr>
            <td className="noTable">{idx+1}</td>
            {val.map((val, index) => {
              return (
                <>
                  <td>{val}</td>
                </>
              );
            })}
          </tr>
        );
      }
    }
    });
  };

  cancelBtnHandler = () => {
    this.setState({ selectedFile: null });
    this.renderUploadData();
    this.setState({ data: [] });
  };

  prevNextPage = (nextorprev) => {
    if (nextorprev == "prev") {
      if (this.state.activePage == 1) {
        return null;
      }
      this.setState({ activePage: this.state.activePage - 1 });
    } else if(nextorprev == "next"){
      this.setState({ activePage: this.state.activePage + 1 });
    }
    else if (nextorprev == "prevInvalid") {
      if (this.state.activePageInvalid == 1) {
        return null;
      }
      this.setState({ activePageInvalid: this.state.activePageInvalid - 1 });
    } else {
      this.setState({ activePageInvalid: this.state.activePageInvalid + 1 });
    }
    
  };
  render() {
    return (
      <>
        <div className="main-header">
          <h5>Upload Data</h5>
        </div>
        <div className="main-body">
          <div className="main-body-input" id="import">
            <div className="row">
              <div className="text-center pt-2" style={{ flex: "1" }}>
                Import data
              </div>
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
            <div className="row pt-2">
              <a
                style={{ paddingLeft: "120px" }}
                href="http://localhost:8080/files/download/excel_template.xlsx"
              >
                {" "}
                Export Excel Template
              </a>
            </div>
          </div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Table className="tableWidth">
              {this.state.selectedFile ? (
                <thead>
                  <tr>
                    <th className="noTable">No</th>
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
              minHeight: "560px",
            }}
          >
            <Table className="tableWidth" striped bordered hover responsive>
              <tbody>{this.renderUploadData()}</tbody>
            </Table>

            {this.state.selectedFile ? (
              <>
                <div className="d-flex justify-content-end">
                  Total Row : {this.state.data.length - 1}
                </div>
              </>
            ) : null}
          </div>

          {this.state.selectedFile ? (
            <>
              <div className="justify-content-center d-flex border">
                <Pagination>
                  <Pagination.Prev onClick={() => this.prevNextPage("prev")} />

                  <Pagination.Item>
                    Page {this.state.activePage}{" "}
                    <input
                      // value={this.state.activePage}
                      onKeyPress={(e) => this.handleKeyPress(e)}
                      className="pageInput"
                      type=""
                      name=""
                      id=""
                    />
                  </Pagination.Item>

                  <Pagination.Next onClick={() => this.prevNextPage("next")} />
                </Pagination>
              </div>

            
            </>
          ) : null}

          <div
            style={{
              height: "400px",
              overflow: "auto",
              paddingLeft: "20px",
              paddingRight: "20px",
              minHeight: "560px",
            }}
          >

            {this.state.selectedFile?
              <div className="d-flex pt-3">
              <h5>
              Invalid Data
              </h5>
            </div>
            :null
            }
          
            <Table className="tableWidth" striped bordered hover responsive>
              <tbody>{this.renderDataInvalid()}</tbody>
            </Table>
          </div>
          {this.state.selectedFile ? (
            <>
              <div className="justify-content-center d-flex border">
                <Pagination>
                  <Pagination.Prev onClick={() => this.prevNextPage("prevInvalid")} />

                  <Pagination.Item>
                    Page {this.state.activePageInvalid}{" "}
                    <input
                      // value={this.state.activePage}
                      onKeyPress={(e) => this.handleKeyPress(e)}
                      className="pageInput"
                      type=""
                      name=""
                      id=""
                    />
                  </Pagination.Item>

                  <Pagination.Next onClick={() => this.prevNextPage("nextInvalid")} />
                </Pagination>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <ButtonUI onClick={this.uploadBtnHandler} className="m-3">
                  Upload
                </ButtonUI>
                <ButtonUI
                  onClick={() => this.cancelBtnHandler()}
                  type="outline"
                  className="m-3"
                >
                  Cancel
                </ButtonUI>
              </div>
            </>
          ) : null}
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
