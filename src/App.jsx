import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';

// var myWebsocket = new WebSocket("http://localhost:3001");


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {},
      messages: [{ id: 3, username: "Michelle", content: "Hello there!" }]
    };

    this.onNewPost = this.onNewPost.bind(this);
    this.onUpdatingUsername = this.onUpdatingUsername.bind(this);

    // Connecting to our websocket. Client connected should appear now re: chat_Server - server.js
    this.socket = new WebSocket("ws://localhost:3001");
  }

  //handles username change
  onUpdatingUsername(content) {
    console.log("This is the username: " + content);
    if (content === "") {
      this.state.currentUser.username = "Anonymous User"
    } else {
      this.state.currentUser.username = content;
    }
  }


  //receiving new post
  onNewPost(content) {
    console.log("This is the parent: " + content);

    if (content === "") {
      window.alert("Please enter a message in order to chat! :)");
    } else {

      var msg = {
        username: this.state.currentUser.username,
        content: content
      };
      //send message to our server
      this.socket.send(JSON.stringify(msg));
    }
  }

  componentDidMount() {
    //loading
    setTimeout(() => {
      this.setState({
        loading: false
      })
      console.log("Connected to server")
    }, 1000);


    //set user to anymous when the porgram first opens
    this.state.currentUser.username = "Anonymous User"

    //receive messages back from the server!!! :) 
    this.socket.onmessage = (event) => {
      console.log("we are in the client side");
      console.log(event.data);

      const obj = JSON.parse(event.data);

      // console.log("text is: " + obj.text)
      // console.log("name is: " + obj.user)
      // console.log("id is: " + obj.id) //obj.id

      let allMessages = this.state.messages.concat(obj);
      this.setState({
        messages: allMessages
      });
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
          <Navbar />
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
