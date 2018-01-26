import React, { Component, fragment } from "react";
import Modal from "./Modal";
import Utility from "./components/lookup";

const data = require("./data.json").Data;
const tmpCoinList = [];

for (let key in data) {
  tmpCoinList.push({ key, value: data[key] });
}

const coinList = tmpCoinList.slice(8, 300);
console.log(coinList[0]);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Utility />
      </div>
    );
  }
}

export default App;
