import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const numberWithCommas = x => {
  const parts = x.split(".");
  if (parts.length === 2) {
    const fPart = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${fPart}.${parts[1]}`;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class CoinInfo extends Component {
  constructor(props) {
    super(props);
    this.classTimer = null;
    this.state = {
      currentClass: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const { flag } = nextProps;
    if (this.classTimer) {
      clearTimeout(this.classTimer);
    }
    let currentClass = "";

    if (flag === "1") {
      currentClass = "up";
    } else if (flag === "2") {
      currentClass = "down";
    }

    this.setState({
      currentClass
    });

    this.classTimer = setTimeout(() => {
      this.setState({ currentClass: "" });
    }, 600);
  }

  componentWillUnmount() {
    if (this.classTimer) {
      clearTimeout(this.classTimer);
    }
  }

  render() {
    return (
      <div className="coin-info">
        {this.props.hasData ? (
          <Fragment>
            <div className="price-label">Price:</div>
            <span className={`coin-price ${this.state.currentClass}`}>
              {numberWithCommas(this.props.currentPrice)}
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <div className="price-label">Price:</div>
            <span>no data available</span>
          </Fragment>
        )}
      </div>
    );
  }
}

CoinInfo.propTypes = {
  currentPrice: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  hasData: PropTypes.bool.isRequired
};

export default CoinInfo;
