import React, { Component } from "react";
import PropTypes from "prop-types";

class ContentA extends Component {
  render() {
    return (
      <div className="box">
        <article className="media">
          <div className="media-left" />
          <div className="media-content">
            <div className="content">
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                <small>31m</small>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                efficitur sit amet massa fringilla egestas. Nullam condimentum
                luctus turpis.
              </p>
            </div>
          </div>
        </article>
        <footer className="modal-card-foot">
          <a className="button is-success">Save changes</a>
          <a className="button" onClick={this.props.closeModal}>
            Cancel
          </a>
        </footer>
      </div>
    );
  }
}

ContentA.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ContentA;
