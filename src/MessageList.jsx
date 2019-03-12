import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map((message) => {
          return (
            //this renders our messages
            <Message message={message} />
          );
        })}
      </div>
    )
  }
}



export default MessageList;