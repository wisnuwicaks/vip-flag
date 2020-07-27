import React, { Component } from "react";
import "../Main.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ButtonUI from "../components/Button/Button";
import { connect } from "react-redux";
import Axios from "axios";
import Pagination from "react-bootstrap/Pagination";

import { API_URL } from "../../constants/API";

class CifReport extends Component {
  state = {
    cifApproved: [],
    activePage: 1,

  };
  componentDidMount() {
    this.getCifList();
  }

  getCifList = () => {
    Axios.get(`${API_URL}/cifapprove/all_approved`)
      .then((res) => {
        this.setState({ cifApproved: res.data });
      })
      .catch((err) => {
        console.log("ini err");
        console.log(err);
      });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({ activePage: parseInt(e.target.value) });
    }
  };

  renderCifList = () => {
    const { cifApproved,activePage } = this.state;
    let startIdx = activePage * 10 - 10;
    let lastIdx = activePage * 10 - 1;
    let arrRender = []
    
    cifApproved.forEach((val, idx) => {
      if (idx >= startIdx && idx <= lastIdx) {
        arrRender.push(val);
      }
    });
    console.log(arrRender);
    
    return arrRender.map((val, idx) => {
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{val.cfcifn}</td>
            <td>{val.cfvipi}</td>
            <td>{val.cfvipc}</td>
            <td>{val.createdDate}</td>
            <td>{val.approvalDate}</td>
            <td>{val.approvalStatus}</td>
          </tr>
        </>
      );
    });
  };
  render() {
    return (
      <>
        <div className="main-header">
    {/* <h5>Upload Log {this.props.cif.cifData.length}</h5> */}
    <h5>Upload Log</h5>

        </div>
        <div className="main-body">
          <div className="main-body-show-body">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <td>No</td>
                  <td>CFCIFN</td>
                  <td>CFVIPI</td>
                  <td>CFVIPC</td>
                  <td>Created Date</td>
                  <td>Approval Date</td>
                  <td>Approval Status</td>
                </tr>
              </thead>
              <tbody>
                {this.renderCifList()}
              
              </tbody>
            </Table>
          </div>
          <div className="justify-content-center d-flex border">
            <Pagination>
              <Pagination.Prev
                onClick={() =>
                  this.setState({ activePage: this.state.activePage - 1 })
                }
              />

              <Pagination.Item>
        
                Page {this.state.activePage}{" "}
                <input
                  onKeyPress={(e) => this.handleKeyPress(e)}
                  className="page"
                  type=""
                  name=""
                  id=""
                />
              </Pagination.Item>

              <Pagination.Next
                onClick={() =>
                  this.setState({ activePage: this.state.activePage + 1 })
                }
              />
            </Pagination>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cif: state.cif,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CifReport);
