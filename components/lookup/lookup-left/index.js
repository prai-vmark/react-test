import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import io from "socket.io-client";
import constants from "../../constants";

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
      hasData: false
    };
  }
  componentDidMount() {
    let currentPrice;
    this.socket = io(constants.streamUrl);
    this.socket.on("m", currentData => {
      console.log(currentData);
      const curData = currentData.split("~");
      const flag = curData[4];
      currentPrice = curData[5];

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
      return;
    }
    console.log("what");
    this.socket.emit("SubRemove", { subs: [this.currentSubs] });

    this.currentCoin = selectedCoin.name;
    const dataUrl = `${constants.dataUrl}fsym=${selectedCoin.Name}&tsyms=USD`;
    axios.get(dataUrl).then(({ data }) => {
      console.log(data);
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

  render() {
    return (
      <div className="left-content">
        <div className="info-container">
          <div className="coin-card">
            {/* <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="btc icon"
                /> */}
            <img
              src={
                this.props.selectedCoin.ImageUrl
                  ? `${constants.baseUrl}${this.props.selectedCoin.ImageUrl}`
                  : ""
              }
              alt="btc icon"
            />
            <div className="coin-label">
              <span className="coin-name">
                {this.props.selectedCoin.Name
                  ? this.props.selectedCoin.CoinName
                  : "---"}
              </span>
            </div>
          </div>
          <div className="coin-info">
            {this.state.hasData ? (
              <div>
                <div className="price-label">Price:</div>
                <span className="coin-price">{this.state.currentPrice}</span>
              </div>
            ) : (
              <div>
                <div className="price-label">Price:</div>
                <span>no data available</span>
              </div>
            )}
          </div>
        </div>
        {/* info-container end */}
      </div>
    );
  }
}

LeftContent.propTypes = {
  selectedCoin: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.any
  }).isRequired
};

export default LeftContent;
