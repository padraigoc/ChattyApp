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
  onUpdatingUsername(newUsername) {
    console.log("This is the old username: " + this.state.currentUser.username);
    const oldUsername = this.state.currentUser.username; 
    console.log("This is the new username: " + newUsername);

    if (newUsername === "") {
      this.state.currentUser.username = "Anonymous"
    } else {
      this.state.currentUser.username = newUsername;
    }
  

    //send notification to our server
    var notifictionMsg = {
      type: "postNotification",
      oldUsername: oldUsername,
      newUsername: newUsername,
      content: `${oldUsername} has changed their name to ${this.state.currentUser.username}`
    };

    //error handling for checking onBlur - if both anonymous, I don't want to print 'Anonymous' changed to 'Anonymous' 
    if(oldUsername !== "Anonymous" && newUsername !=="Anonymous"){
    this.socket.send(JSON.stringify(notifictionMsg));
    }
  }


  //receiving new post
  onNewPost(content) {
   // console.log("This is the parent: " + content);

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
    //loading
    setTimeout(() => {
      this.setState({
        loading: false
      })
      console.log("Connected to server")
    }, 1000);


    //set user to anymous when the porgram first opens
    this.state.currentUser.username = "Anonymous"

    //receive messages back from the server!!! :) 
    this.socket.onmessage = (event) => {
      // console.log("we are in the client side");
      // //console.log(event.data);
   
       const obj = JSON.parse(event.data);

       //determine the type of message, notification or message
     // console.log("type of message is: " + obj.msgType);

      // switch(obj.msgType) {
      //   case "incomingMessage":
      //   console.log("This is a message");
      //   break;
      //   case "incomingNotification":
      //   console.log(obj.oldUsername + " has changed their name to " + obj.newUsername);
      //   const nameChange = (obj.oldUsername + " has changed their name to " + obj.newUsername);


        
      //   break;
      //   default:
      //   // show an error in the console if the message type is unknown
      //   throw new Error("Unknown event type " + data.type);
      // }

      // this.state = {
      //   loading: true,
      //   currentUser: {},
      //   messages: [{ id: 3, username: "Michelle", content: "Hello there!" }]
      // };



      let allMessages = this.state.messages.concat(obj);
      console.log(allMessages);
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