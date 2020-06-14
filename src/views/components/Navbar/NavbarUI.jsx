import React from "react";
import "./NavbarUI.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler } from "../../../redux/actions";

import {
  Navbar,
  NavbarBrand,
  NavDropdown,
  NavDropdownItem,
  NavbarToggle,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import ButtonUI from "../Button/Button";

class NavbarUI extends React.Component {
  logoutBtnHandler = () => {
    this.props.onLogout();

    return <Redirect to="/" />;
  };
  render() {
    return (
      <div>
        <div className="container-fluid navtitle my-auto">
          <div className="d-flex-column pt-1">
            <h6>VIP Downgrade/Upgrade</h6>
          </div>
        </div>
        <div className="container-fluid navlogo p-0">
          <Navbar bg="light" expand="lg" className="">
            <Navbar.Brand>
              <img
                src="https://i.ibb.co/RS4rkHQ/images-removebg-preview.png"
                height="60px"
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="d-flex justify-content-end w-100">
                <div className="px-2">UserID : {this.props.user.id}</div>
                <div className="px-2">
                  Group Menu : {this.props.user.role.toUpperCase()}
                </div>
                <div>
                  <Link to="/">
                    <ButtonUI className="ml-2" onClick={this.logoutBtnHandler}>
                      Logout
                    </ButtonUI>
                    {/* <button onClick={this.logoutBtnHandler}> Logout</button> */}
                  </Link>
                </div>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  onLogout: logoutHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavbarUI);
