import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ButtonUI from "../components/Button/Button";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../../constants/API";

class FileApproved extends Component {
  state = {
    file: [],
  };
  componentDidMount() {
    this.getFile();
  }

  getFile = () => {
    Axios.get(`${API_URL}/files/maker/${this.props.user.userId}/Approved`)
      .then((res) => {
        this.setState({ file: res.data });
      })
      .catch((err) => {
        console.log("ini err");

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
            <td>{val.createdDate}</td>
            <td>{val.approvalStatus}</td>
            <td>
              <ButtonUI type="text" onClick={() => alert("detail")}>
                Detail
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
          <h5>Upload Log</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(FileApproved);
