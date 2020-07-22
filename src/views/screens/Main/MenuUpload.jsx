import React, { Component } from "react";
import "./Main.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import Table from "react-bootstrap/Table";

class MenuUpload extends Component {
  state = {
    selectedFile: null,
    cols: [],
    rows: [],
    data: [],
  };

  // fileUploadHandler = (e) => {
  //   this.setState({ selectedFile: e.target.files[0] });
  //   console.log(this.state.selectedFile);
  // };

  fileUploadHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log(fileObj);

    let fileType=fileObj.name.substring(fileObj.name.lastIndexOf(".")+1)
    if(fileType!=="xlsx"){
      return alert("extensi file tidak sesuai")
    }
    // console.log(fileObj.name);
    
    
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("err :" + err);

        // console.log(resp);
        // console.log(resp.cols);
        this.setState({
          // cols: resp.cols,
          // rows: resp.rows,
          data: resp.rows,
        });
      }
    });
  };

  renderUploadData = () => {
    let minLength = 0;
    return this.state.data.map((val, idx, arr) => {
      if (idx === 0) {
        minLength = val.length;
        return (
          <tr>
            {val.map((val) => {
              return <th>{val}</th>;
            })}
            <th>Status</th>
          </tr>
        );
      } else {
        let count = 0;
        return (
          <tr>
            {val.map((val, index) => {
              if (val !== "") count++;
              return <td>{val === "" ? "null" : val}</td>;
            })}
            <td>{count < minLength ? "invalid" : "valid"}</td>
          </tr>
        );
      }
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
          {/* <OutTable
            data={this.state.rows}
            columns={this.state.cols}
            tableClassName="ExcelTable2007"
            tableHeaderRowClass="heading"
          /> */}
          <Table striped bordered hover responsive>
            <tbody>{this.renderUploadData()}</tbody>
          </Table>
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

export default MenuUpload;
