import React, { Component } from "react";
import autobind from "react-autobind";

class Token extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    let { name, symbol, image } = this.props;
    return (
      <div onClick={this.props.handleClick} className="token" draggable="true">
        <img src={image} alt={symbol} width="50px" height="50" />
        <p>{name}</p>
      </div>
    );
  }
}
export default Token;
