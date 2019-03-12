import React, { Component } from 'react';


class ChatBar extends Component {
    render() {
        return (
            <footer className="chatbar">
                {/* Data Flow in Chatty - Pass currentUser using props */}
                <p>username: {this.props.currentUser}</p>
                <input className="chatbar-username" placeholder="Your Name (Optional)" />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>);
    }
}

export default ChatBar;