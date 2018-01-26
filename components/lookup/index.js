import React, { Component } from "react";
import Modal from "../../Modal";
import LookupRight from "./lookup-right";

const data = require("../../data.json").Data;
const tmpCoinList = [];

for (let key in data) {
  tmpCoinList.push({ key, value: data[key] });
}

const coinList = tmpCoinList; //.slice(8, 200);
// console.log(coinList[0]);

class Utility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCoin: { key: "", value: "" }
    };

    this.selectCoin = this.selectCoin.bind(this);
  }

  selectCoin(coin) {
    console.log("called with ", coin);
    this.setState({
      selectedCoin: coin
    });
  }

  render() {
    return (
      <div className="card addwidget">
        <header className="card-header">Lookup Utility</header>
        <div className="card-content">
          <div className="content">
            <div className="left-content">
              <h4>John</h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
            </div>
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
