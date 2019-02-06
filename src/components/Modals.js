import React, { Component } from "react";

export default class Modals extends Component {
  state = {
    show: false,
    status: "",
    text: ""
  };

  showModal = (status, text) => {
    this.setState({ status: status, text: text, show: true });
  };

  hideModal = () => {
    this.setState({ text: null, show: false });
  };

  render() {
    return (
      <div
        className={"page-hover " + (this.state.show ? " active" : "")}
        onClick={this.hideModal}
      >
        <div className="modal-alert">
          <p className="modal-alert__heading">{this.state.status}</p>
          <p className="modal-alert__text">{this.state.text}</p>
          <button className="button ok" onClick={this.hideModal}>
            OK
          </button>
        </div>
      </div>
    );
  }
}
