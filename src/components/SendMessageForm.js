import React, { Component } from "react";

class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };

  render() {
    return (
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <input
          placeholder="Send Message Form"
          type="text"
          value={this.state.message}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SendMessageForm;
