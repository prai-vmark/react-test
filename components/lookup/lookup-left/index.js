import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";
import constants from "../../constants";
import CoinInfo from "./CoinInfo";
import CoinCard from "./CoinCard";
import CoinForm from "./CoinForm";

class LeftContent extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.new = false;
    this.currentCoin = "";
    this.currentSubs = [];
    this.state = {
      currentPrice: "---",
      flag: "",
      hasData: false,
      selectedCryptos: []
    };

    this.addToFolio = this.addToFolio.bind(this);
    this.removeCrypto = this.removeCrypto.bind(this);
    this.submitCallback = this.submitCallback.bind(this);
  }

  componentDidMount() {
    this.socket = io(constants.streamUrl);
    this.socket.on("m", currentData => {
      console.log(currentData);
      const curData = currentData.split("~");
      const flag = curData[4];
      const currentPrice = curData[5];

      if (flag === "3") return;
      if (currentPrice !== undefined) {
        if (this.new === true) {
          this.new = false;
          this.setState({ currentPrice, flag });
        } else if (flag !== "4") {
          this.setState({ currentPrice, flag });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { selectedCoin } = nextProps;
    if (!selectedCoin.Name) {
      this.setState({
        currentPrice: "---",
        flag: "",
        hasData: false
      });
      this.socket.emit("SubRemove", { subs: [this.currentSubs] });
      return;
    }

    this.socket.emit("SubRemove", { subs: [this.currentSubs] });

    this.selectedCoin = selectedCoin;

    const dataUrl = `${constants.dataUrl}fsym=${selectedCoin.Name}&tsyms=USD`;
    axios.get(dataUrl).then(({ data }) => {
      const hasData = data["USD"]["CURRENT"];
      if (hasData.length) {
        this.setState({
          hasData: true
        });
        this.currentSubs = data["USD"]["CURRENTAGG"];
        this.new = true;
        this.socket.emit("SubAdd", { subs: [this.currentSubs] });
      } else {
        this.setState({
          hasData: false
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.currentSubs.length) {
      this.socket.emit("SubRemove", { subs: this.currentSubs });
    }
  }

  addToFolio(quantity, addDate) {
    const { selectedCryptos } = this.state;
    const newCoin = {};
    newCoin.Id = this.props.selectedCoin.Id;
    newCoin.Name = this.props.selectedCoin.Name;
    newCoin.CoinName = this.props.selectedCoin.CoinName;
    newCoin.ImageUrl = this.props.selectedCoin.ImageUrl;
    newCoin.Quantity = quantity;
    newCoin.Price = this.state.currentPrice;
    newCoin.AddDate = addDate;
    selectedCryptos.push(newCoin);
    this.setState({
      selectedCryptos
    });
  }

  removeCrypto(id) {
    const selectedCryptos = this.state.selectedCryptos.filter(
      item => item.Id !== id
    );
    this.setState({
      selectedCryptos
    });
  }

  submitCallback() {
    const cryptos = this.state.selectedCryptos.map(item => item.Name);
    alert(`Some callback called with ${cryptos.join(', ')}`)
  }

  render() {
    return <div className="left-content">
        <div className="info-container">
          <CoinCard selectedCoin={this.props.selectedCoin} />
          <div className="coin-stuff">
            <CoinInfo currentPrice={this.state.currentPrice} flag={this.state.flag} hasData={this.state.hasData} />
            <CoinForm addToFolio={this.addToFolio} hasData={this.state.hasData} />
          </div>
        </div>
        <div className="selectedCrypto">
          <table className="table is-striped is-narrow">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.selectedCryptos.map(item => <tr key={item.Id}>
                  <td>{item.Name}</td>
                  <td>{item.CoinName}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.Price}</td>
                  <td>{item.AddDate}</td>
                  <td className="red" onClick={() => this.removeCrypto(item.Id)}>
                    -
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="lookup-control">
          <button className="button is-primary is-outlined" disabled={!this.state.selectedCryptos.length} onClick={this.submitCallback}>
            Add to Portfolio
          </button>
          <button disabled={!this.state.selectedCryptos.length} className="button is-danger cancel-btn is-outlined">
            Cancel
          </button>
        </div>
      </div>;
  }
}

LeftContent.propTypes = {
  selectedCoin: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.any
  }).isRequired
};

export default LeftContent;
