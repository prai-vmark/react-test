import React, { Component } from "react";
import LookupRight from "./lookup-right";
import LookupLeft from "./lookup-left";

const data = require("../../data.json").Data;

const tmpCoinList = [];
Object.keys(data).forEach(key => tmpCoinList.push({ key, value: data[key] }));

const coinList = tmpCoinList;
// console.log(coinList[0]);

class Utility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCoin: {}
    };

    this.selectCoin = this.selectCoin.bind(this);
  }

  selectCoin(coin) {
    let newCoin = coin;
    if (this.state.selectedCoin.Name === newCoin.Name) {
      newCoin = {};
    }
    this.setState({ selectedCoin: newCoin });
  }

  render() {
    return (
      <div className="card addwidget">
        <header className="card-header">Lookup Utility</header>
        <div className="card-content">
          <div className="content">
            <LookupLeft selectedCoin={this.state.selectedCoin} />
            <LookupRight
              coinList={coinList}
              selectCoin={this.selectCoin}
              selectedCoin={this.state.selectedCoin}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Utility;
