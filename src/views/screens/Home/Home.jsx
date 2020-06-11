import React, { Component } from "react";
import "./Home.css";
import NavbarUI from "../../components/Navbar/NavbarUI";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

class Home extends Component {
  render() {
    return (
      <>
        <NavbarUI />
        <div className="row">
          <div className="col-3 pr-2">
            <Sidebar />
          </div>
          <div className="col pl-0">
            <Main />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
