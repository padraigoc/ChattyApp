import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      connectedUsers: 0,
      currentUser: {},
      messages: []
    };

    // Connecting to our websocket
    this.socket = new WebSocket("ws://localhost:3001");
    this.onNewPost = this.onNewPost.bind(this);
    this.onUpdatingUsername = this.onUpdatingUsername.bind(this);
  }

  //handles username change
  onUpdatingUsername(newUsername) {
    const oldUsername = this.state.currentUser.username;

    if (newUsername === "") {
      this.state.currentUser.username = "Anonymous"
    } else {
      this.state.currentUser.username = newUsername;
    }

    //send to server
    var notifictionMsg = {
      type: "postNotification",
      oldUsername: oldUsername,
      newUsername: newUsername,
      content: `${oldUsername} has changed their name to ${this.state.currentUser.username}`
    };

    //error handling for checking onBlur - if both anonymous, don't print ""'Anonymous' changed to 'Anonymous'"
    if (oldUsername !== "Anonymous" && newUsername !== "Anonymous") {
      this.socket.send(JSON.stringify(notifictionMsg));
    }
  }

  //receiving new post
  onNewPost(content) {
    if (content === "") {
      window.alert("Please enter a message in order to chat! :)");
    } else {
      //send message to our server
      var msg = {
        type: "postMessage",
        username: this.state.currentUser.username,
        content: content
      };
      this.socket.send(JSON.stringify(msg));
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
      console.log("Connected to server")
    }, 1000);

    //set user to anymous when the porgram first opens
    this.state.currentUser.username = "Anonymous"

    //receive messages back from the server
    this.socket.onmessage = (event) => {
      const obj = JSON.parse(event.data);

      //if we receive the number of users
      if (obj.type === 'NoOfUsers') {
        this.setState({
          connectedUsers: obj.msg
        });
      } else {

        let allMessages = this.state.messages.concat(obj);
        this.setState({
          messages: allMessages
        });
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Navbar />
          <p>Loading...</p>
          <ChatBar c />
        </div>);
    } else {
      return (
        <div>
          <Navbar connectedUsers={this.state.connectedUsers} />
          <MessageList messages={this.state.messages} />
          <ChatBar
            currentUser={this.state.currentUser.username}
            onNewPost={this.onNewPost}
            onUpdatingUsername={this.onUpdatingUsername} />
        </div>
      );
    }
  }
}

export default App;