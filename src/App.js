import React, { Component } from "react";
import "./styles.css";
import Web3 from "web3";
import autobind from "react-autobind";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaMaskButton } from "rimble-ui";
import { tokens } from "./tokens.js";
import Token from "./components/token.js";
import Header from "./components/header.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: { name: "null" },
      tokens: Object.values(tokens)
    };
    autobind(this);
  }

  notify(status) {
    if (status === "success") {
      toast.success("🦄 Token added!");
    } else if (status === "error") {
      toast.warn("💩 There was a problem adding the token.");
    } else {
      toast.error("Something went wrong!");
    }
  }

  async componentDidMount() {
    if (window.ethereum) {
      window.ethereum.publicConfigStore._state.isUnlocked
        ? this.loadweb3()
        : console.log("Connect with MetaMask");
    }
  }

  async loadweb3() {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;

      window.web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.enable();
        await this.loadData();
      } catch (error) {
        alert("Something went wrong!");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadData() {
    window.ethereum.sendAsync(
      { method: "eth_requestAccounts" },
      (error, response) =>
        this.setState({
          address: response.result[0],
          connected: true
        })
    );
    window.ethereum.on("accountsChanged", async accounts => {
      window.ethereum.sendAsync(
        { method: "eth_requestAccounts" },
        (error, response) =>
          this.setState({
            address: response.result[0],
            connected: true
          })
      );
    });
  }

  async addToken(e) {
    window.ethereum.sendAsync(
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
          this.notify("error");
          return;
        }

        added.result ? this.notify("success") : this.notify("error");
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Header address={this.state.address} connected={this.state.connected} />

        {this.state.connected ? (
          <ul className="tokens-list">
            {this.state.connected
              ? this.state.tokens.map(e => (
                  <Token
                    key={e.address}
                    handleClick={() => this.addToken(e)}
                    name={e.name}
                    symbol={e.symbol}
                    decimals={e.decimals}
                    address={e.address}
                    image={e.image}
                  />
                ))
              : null}
          </ul>
        ) : (
          <div>
            <div className="message" draggable="true">
              <p>Available on Mainnet and desktop MetaMask version only</p>
            </div>
            <MetaMaskButton.Outline size="large" onClick={this.loadweb3}>
              Connect with MetaMask
            </MetaMaskButton.Outline>
          </div>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
