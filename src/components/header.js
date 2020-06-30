import React, { Component } from "react";
import autobind from "react-autobind";

class Header extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    return (
      <div className="header">
        <div className="logo" draggable="true">
          <img
            src="https://i.ibb.co/w6gMBmZ/chemistry-lab-instrument-yellow.png"
            alt="logo"
            width="20px"
          />
          <h3 draggable="true">MetaFlask</h3>
        </div>
      </div>
    );
  }
}
export default Header;
