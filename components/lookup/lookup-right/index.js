import React, { Component } from "react";
import PropTypes from "prop-types";
import DisplayTable from "./DisplayTable";

class RightContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinListSeed: this.props.coinList,
      coinList: this.props.coinList
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
  }

  handleSearchInput(evt) {
    evt.persist();
    const val = evt.target.value.trim();
    const delay = val === "" ? 0 : 200;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      // console.log("debouncedSearch called");
      this.debouncedSearch(val);
    }, delay);
  }

  debouncedSearch(val) {
    if (val !== "") {
      const coinList = this.state.coinListSeed.filter(
        coin => coin.key.indexOf(val.toUpperCase()) !== -1
      );
      this.setState({
        coinList
      });
    } else {
      this.setState({
        coinList: this.state.coinListSeed
      });
    }
  }

  render() {
    return (
      <div className="right-content">
        <input
          className="input is-small coin-lookup"
          type="text"
          placeholder="Search" // ref={input => (this.searchInput = input)}
          onChange={this.handleSearchInput}
        />
        <DisplayTable
          coinList={this.state.coinList}
          selectCoin={this.props.selectCoin}
          selectedCoin={this.props.selectedCoin}
        />
      </div>
    );
  }
}

RightContent.propTypes = {
  coinList: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectCoin: PropTypes.func.isRequired,
  selectedCoin: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.any
  }).isRequired
};

export default RightContent;
