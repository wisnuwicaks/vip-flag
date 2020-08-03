import React from "react";
import "./NavbarUI.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutHandler } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
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
  DropdownButton,
} from "react-bootstrap";
import ButtonUI from "../Button/Button";

class NavbarUI extends React.Component {
  logoutBtnHandler = () => {
    this.props.onLogout(this.props.user.userId);
    return <Redirect to="/" />;
  };
  render() {
    return (
      <div>
        <div className="container-fluid navtitle my-auto">
          <div className="d-flex-column pt-1">
            <h6>VIP Flag Maintenance</h6>
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
                <div className="px-2">
                  Group Menu :{" "}
                  {this.props.user.userRole["roleName"].toUpperCase()}
                </div>
                <div className="px-2">User :</div>

                <div className="mr-5">
                  <DropdownButton
                    alignRight
                    key="danger"
                    id="dropdown-variants-danger"
                    // id="dropdown-menu-align-right"
                    variant="danger"
                    size="sm"
                    title={this.props.user.username}
                  >
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <Dropdown.Item>
                      <Link to="/changepassword">
                        <ButtonUI type="textual" style={{ padding: "0px" }}>
                          Change Password
                        </ButtonUI>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.logoutBtnHandler}>
                      <Link to="/">
                        <ButtonUI type="textual" style={{ padding: "0px" }}>
                          Logout
                        </ButtonUI>
                      </Link>
                    </Dropdown.Item>
                  </DropdownButton>
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
