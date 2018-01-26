import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class DisplayTable extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(next) {
    // console.log("component updating");
    // this.time = new Date();
    // console.log(next);
  }

  componentDidUpdate(prev, next) {
    // setTimeout(() => {
    //   console.log("component update complete");
    //   console.log("time: ", new Date().getTime() - this.time.getTime());
    //   console.log(prev);
    //   console.log(next);
    // }, 0);
  }

  rowClickHandler(value) {
    console.log("clicked");
    console.log(value);
    this.props.selectCoin(value);
  }

  render() {
    return (
      <Fragment>
        <table className="table is-hoverable is-narrow">
          <thead>
            <tr>
              <th>Add</th>
              <th>One</th>
              <th>Two</th>
            </tr>
          </thead>
        </table>
        <div className="scroll-table">
          <table id="coin-table" className="table is-hoverable is-narrow">
            <tbody>
              {this.props.coinList.map(({ value }) => (
                <tr key={value.Id} onClick={() => this.rowClickHandler(value)}>
                  <td>+</td>
                  <td>{value.Symbol}</td>
                  <td>{value.CoinName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

DisplayTable.propTypes = {
  coinList: PropTypes.array.isRequired,
  selectCoin: PropTypes.func.isRequired,
  selectedCoin: PropTypes.object.isRequired
};

export default DisplayTable;
