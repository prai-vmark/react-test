import React, { Component, fragment } from "react";
import Utility from "./components/lookup";

const data = require("./data.json").Data;
const tmpCoinList = [];

for (let key in data) {
  tmpCoinList.push({ key, value: data[key] });
}

const coinList = tmpCoinList.slice(8, 300);

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
