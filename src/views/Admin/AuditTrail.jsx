import React from "react";
import "./AuditTrail.css";

import { API_URL } from "../../constants/API";
import { connect } from "react-redux";
import Axios from "axios";
import { Table, Badge } from "reactstrap";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import swal from "sweetalert";

class AuditTrail extends React.Component {
  state = {
    auditTrailAccess: [],
    auditTrailLogin: [],
    auditTrailChanges: [],

    addFormToggle: false,
    tabActive: "auditLogin",
  };
  componentDidMount() {
    this.getAuditTrailAccess();
    this.getAuditTrailLogin();
    this.getAuditTrailChanges();

  }

  tabActiveHandler = (status) => {
    this.setState({ tabActive: status });

    // this.getTransactionList()
  };

  getAuditTrailAccess = () => {
    Axios.get(`${API_URL}/audit_access/all_log`)
      .then((res) => {
        console.log(res.data);
        this.setState({ auditTrailAccess: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAuditTrailLogin = () => {
    Axios.get(`${API_URL}/audit_login/all_log`)
      .then((res) => {
        console.log(res.data);
        this.setState({ auditTrailLogin: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAuditTrailChanges = () => {
    Axios.get(`${API_URL}/audit_changes/all_log`)
      .then((res) => {
        console.log(res.data);
        this.setState({ auditTrailChanges: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderAuditAccess = () => {
    const { auditTrailAccess } = this.state;
    return auditTrailAccess.map((val, idx) => {
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{val.actionDate}</td>
            <td>{val.actionDescription}</td>
            <td>{val.userId}</td>
            <td>{val.username}</td>
          </tr>
        </>
      );
    });
  };

  renderAuditLogin = () => {
    const { auditTrailLogin } = this.state;
    return auditTrailLogin.map((val, idx) => {
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{val.userId}</td>
            <td>{val.username}</td>
            <td>{val.lastLogin}</td>
            <td>{val.lastLogout}</td>
     
          </tr>
        </>
      );
    });
  };

  renderAuditChanges = () => {
    const { auditTrailChanges } = this.state;
    return auditTrailChanges.map((val, idx) => {
      return (
        <>
          <tr>
          <td>{idx + 1}</td>
            <td>{val.fileId}</td>
            <td>{val.createdDate}</td>
            <td>{val.approvalDate}</td>
            <td>{val.makerId}</td>
            <td>{val.makerUsername}</td>
            <td>{val.checkerId}</td>
            <td>{val.checkerUsername}</td>
          </tr>
        </>
      );
    });
  };

  renderTable = ()=>{
    const {tabActive} = this.state

    if(tabActive=="auditLogin"){
        return (
            <>
             <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Last Login</th>
                <th>Last Logout</th>
              </tr>
            </thead>
            <tbody>{this.renderAuditLogin()}</tbody>
          </Table>
            </>
        )
    }else if(tabActive=="auditAccess"){
        return (
            <>
             <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Action Date</th>
                <th>Action Description</th>
                <th>User ID</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>{this.renderAuditAccess()}</tbody>
          </Table>
            </>
        )
    }else if(tabActive=="auditChanges"){
        return (
            <>
             <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>File ID</th>
                <th>Created Date</th>
                <th>Approval Date</th>
                <th>Maker ID</th>
                <th>Maker Username</th>
                <th>Checker ID</th>
                <th>Checker Username</th>


              </tr>
            </thead>
            <tbody>{this.renderAuditChanges()}</tbody>
          </Table>
            </>
        )
    }
  }

  render() {
    return (
      <>
        <div className="main-header">
          <h5>Audit Trail</h5>
        </div>
        
        <div className="main-body p-4">
        <Nav className="mt-2" variant="tabs" defaultActiveKey="/home">
          <Nav.Item className={this.state.tabActive=="auditLogin"? "tabActive":null}>
            <Nav.Link onClick={() => this.tabActiveHandler("auditLogin")}>
              Audit Trail Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={this.state.tabActive=="auditAccess"? "tabActive":null}>
            <Nav.Link onClick={() => this.tabActiveHandler("auditAccess")}>
              Audit Trail Access
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className={this.state.tabActive=="auditChanges"? "tabActive":null}>
            <Nav.Link onClick={() => this.tabActiveHandler("auditChanges")}>
              Audit Trail Changes
            </Nav.Link>
          </Nav.Item>
          
        </Nav>
        {this.renderTable()}
        </div>
      </>
    );
  }
}

export default AuditTrail;
