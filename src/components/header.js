import React, { Component } from "react";
import autobind from "react-autobind";

class Header extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  trimAddress(addr) {
    return addr.slice(0, 6) + "....." + addr.slice(-5);
  }

  render() {
    let { address } = this.props;
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
        {address ? <p>{this.trimAddress(address)}</p> : null}
      </div>
    );
  }
}
export default Header;
