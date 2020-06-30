import React, { Component } from "react";
import "./styles.css";
import autobind from "react-autobind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokens } from "./tokens.js";
import Token from "./components/token.js";
import Header from "./components/header.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: Object.values(tokens),
      results: Object.values(tokens)
    };
    autobind(this);
  }

  async addToken(e) {
    if (window.ethereum) {
      await window.ethereum.sendAsync(
        {
          method: "metamask_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: e.address,
              symbol: e.symbol,
              decimals: e.decimals,
              image: e.image
            }
          },
          id: Math.round(Math.random() * 100000)
        },
        (err, added) => {
          if (err || "error" in added) {
            toast.error("Something went wrong!");
            return;
          }
          added.result
            ? toast.success("🦄 Token added!")
            : toast.warn("💩 There was a problem adding the token!");
        }
      );
    } else {
      toast.error(
        "⚠️ Non-Ethereum browser detected. You should consider trying MetaMask!",
        { autoClose: false }
      );
    }
  }

  search(arr, str) {
    let result = arr.filter(e => e.name.match(new RegExp(str, "gi")));
    return result;
  }

  handleOnInputChange = e => {
    this.setState({ results: this.search(this.state.tokens, e.target.value) });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <div className="search-div">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              onChange={this.handleOnInputChange}
            />
          </div>

          <ul className="tokens-list">
            {this.state.results.map(e => (
              <Token
                key={e.address}
                handleClick={() => this.addToken(e)}
                name={e.name}
                symbol={e.symbol}
                decimals={e.decimals}
                address={e.address}
                image={e.image}
              />
            ))}
          </ul>
        </div>

        <ToastContainer />
      </div>
    );
  }
}

export default App;
