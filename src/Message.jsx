import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      //App is a parent of Message List, Message List is a parent of Message
      <div className="message">
      <span className="message-username">{this.props.message.username}</span>
      <span className="message-content">{this.props.message.content}</span>
    </div>
    );
  }
}

export default Message;