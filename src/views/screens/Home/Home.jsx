import React, { Component } from "react";
import "./Home.css";
import InputUI from "../../components/Input/Input";
import ButtonUI from "../../components/Button/Button";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div>Hello</div>
        <h1>Hello</h1>
        <h2>Hello</h2>
        <h3>Hello</h3>
        <h4>Hello</h4>
        <h5>Hello</h5>
        <h6>Hello</h6>
        <div className="subtitle-lg">Hello</div>
        <div className="subtitle-md">Hello</div>
        <div className="subtitle-sm">Hello</div>
        <div className="content-lg">Hello</div>
        <div className="content-md">Hello</div>
        <div className="content-sm">Hello</div>
        <caption>Hello</caption>
        <InputUI placeholder="Input" />
        <ButtonUI>Button</ButtonUI>
        <ButtonUI type="outline">Button</ButtonUI>
        <ButtonUI type="text">Button</ButtonUI>
        {/* sdfasdasdsf */}
      </div>
    );
  }
}

export default Home;
