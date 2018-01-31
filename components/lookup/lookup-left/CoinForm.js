import React, { Component } from "react";
import PropTypes from "prop-types";

const getNowDate = () => {
  const dt = new Date();
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt
    .getFullYear()
    .toString()
    .substr(2)}`;
};

class CoinForm extends Component {
  constructor(props) {
    super(props);
    this.callAddToFolio = this.callAddToFolio.bind(this);
  }

  callAddToFolio() {
    const quantity = this.quantityInput.value;
    // let dt = this.dateInput.value;
    let dt = ""; // temporary
    /* eslint-disable */
    if (
      quantity === "" ||
      isNaN(quantity) ||
      (dt !== "" && !/\d{1}\/\d{2}\/\d{2}/.test(dt))
    ) {
      return;
    }
    /* eslint-enable */
    if (dt === "") {
      dt = getNowDate();
    }
    this.props.addToFolio(quantity, dt);
    this.quantityInput.value = "";
    // this.dateInput.value = "";
  }

  render() {
    return this.props.hasData ? (
      <div className="coin-form">
        <div className="field is-horizontal">
          {" "}
          <input
            type="text"
            name="quantity"
            className="input is-small"
            placeholder="Quantity"
            ref={input => {
              this.quantityInput = input;
            }}
          />
          {/* <input
            type="text"
            className="input is-small"
            placeholder="mm/dd/yy"
            ref={input => {
              this.dateInput = input;
            }}
          /> */}
        </div>

        <button className="button is-info" onClick={this.callAddToFolio}>
          Add
        </button>
      </div>
    ) : (
      ""
    );
  }
}

CoinForm.propTypes = {
  addToFolio: PropTypes.func.isRequired,
  hasData: PropTypes.bool.isRequired
};

export default CoinForm;
