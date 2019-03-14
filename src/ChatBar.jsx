import React, { Component } from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
    }

    //Pressing enter handler
    handleKeyPress = (event) => {

        if (event.key === 'Enter') {
            //pass received text in the input field and passing it up to App
            //Passing it back to APP .js
            this.props.onNewPost(event.target.value);
            event.target.value = "";
        }
    }

    handleUserNameChange = (event) => {  
            this.props.onUpdatingUsername(event.target.value);    
    }

    render() {
        console.log(this.props);
        return (

            <footer className="chatbar">
                <input className="chatbar-username"
                    placeholder="Please type a username to chat :)"
                    onBlur = {this.handleUserNameChange}
                    />

                <input className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    onKeyPress={this.handleKeyPress} />

            </footer>);
    }
}

const root = document.getElementById('container')

export default ChatBar;