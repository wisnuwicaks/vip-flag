import React from "react";
import "./NavbarUI.css";
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

class NavbarUI extends React.Component {
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
                <div className="px-2">UserID : user</div>
                <div className="px-2">Group Menu : administrator</div>
                <div>
                  <button onClick={() => alert("asd")}> Logout</button>
                </div>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default NavbarUI;
