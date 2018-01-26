import React, { Component } from "react";
import ContentA from "./ModalAContent";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isActive: true });
  }

  closeModal() {
    this.setState({ isActive: false });
  }

  render() {
    return (
      <div>
        <a
          className="button is-primary modal-button"
          onClick={this.openModal}
          data-target="modal"
        >
          Launch modal
        </a>
        <div className={`modal ${this.state.isActive ? "is-active" : ""}`}>
          <div className="modal-background" />
          <div className="modal-content">
            {/* */}
            <ContentA closeModal={this.closeModal} />
            {/* */}
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.closeModal}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
