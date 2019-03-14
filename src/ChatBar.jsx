import React, { Component } from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleUserNameChangeIfBlank = this.handleUserNameChangeIfBlank.bind(this);
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

        if (event.key === 'Enter') {
            this.props.onUpdatingUsername(event.target.value);  
        } 
    }

    handleUserNameChangeIfBlank = (event) => {  

        if (event.target.value === "") {
            this.props.onUpdatingUsername("Anonymous");  
        } 
    }

  

    render() {
        return (

            <footer className="chatbar">
                <input className="chatbar-username"
                    placeholder="Please type a username hit ENTER :)"
                   onBlur = {this.handleUserNameChangeIfBlank}
                   onKeyPress={this.handleUserNameChange}
                    />

                <input className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    onKeyPress={this.handleKeyPress} />

            </footer>);
    }
}

const root = document.getElementById('container')

export default ChatBar;