import React from "react";
import PropTypes from "prop-types";
import constants from "../../constants";

const CoinCard = props => (
  <div className="coin-card">
    {/* <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="btc icon"
                /> */}
    <img
      src={
        props.selectedCoin.ImageUrl
          ? `${constants.baseUrl}${props.selectedCoin.ImageUrl}`
          : "http://via.placeholder.com/158x158"
      }
      alt="crypto icon"
    />
    <div className="coin-label">
      <span className="coin-name">
        {props.selectedCoin.Name ? props.selectedCoin.CoinName : "---"}
      </span>
    </div>
  </div>
);

CoinCard.propTypes = {
  selectedCoin: PropTypes.shape({
    ImageUrl: PropTypes.string,
    Name: PropTypes.string
  }).isRequired
};

export default CoinCard;
