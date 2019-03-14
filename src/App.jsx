import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';

// var myWebsocket = new WebSocket("http://localhost:3001");


class App extends Component {

  //initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      currentUser: {},
      messages: [{id: 3, username: "Michelle", content: "Hello there!"}]
    };

     this.onNewPost = this.onNewPost.bind(this);
     this.onUpdatingUsername = this.onUpdatingUsername.bind(this);

     // Connecting to our websocket. Client connected should appear now re: chat_Server - server.js
     this.socket = new WebSocket("ws://localhost:3001");

  }

  //handles username change
  onUpdatingUsername(content){
   console.log("This is the username: " + content);
   this.state.currentUser.username = content; 
  }


  //receiving new post
  onNewPost(content) {
    console.log("This is the parent: " + content);

    //adds message to array
    const newMessage = {
      id: content.id, 
      username: this.state.currentUser.username, 
      content: content
    };
      
    //const messages = this.state.messages.concat(newMessage);

    //send the message and username to our server
    var msg = {
      username: this.state.currentUser.username,
      content: content
    };
    this.socket.send(JSON.stringify(msg));
    
    //this sends our message to our server
    //this.socket.send(content);

    // this.setState({
    //   messages: messages,
    //   loading: false,
    // })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage);
    //    // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({
    //     messages: messages,
    //     loading: false
    //   })  
    //   console.log("Connected to server")
    // }, 3000);

    //receive messages back from the server!!! :) 
    this.socket.onmessage = (event) => {
      console.log("we are in the client side");
      console.log(event.data);

      var obj = JSON.parse(event.data);

      console.log("text is: " + obj.text)
      console.log("name is: " + obj.user)
      console.log("id is: " + obj.id) //obj.id


      const newMessage = obj;
      let allMessages = this.state.messages.concat(newMessage);
      console.log("all messages ",allMessages);
      this.setState({
        messages: allMessages
      });

      // const newMessage = {
      //   id: null, 
      //   username: obj.name, 
      //   content: obj.text};

      //    const messages = this.state.messages.concat(newMessage);

      //   this.setState({
      //     messages: messages,
      //     loading: false
      //   })

    


    }
  }

  render() {
    if (this.state.loading) {
      return (
      <div>
        <Navbar />
          <p>Loading...</p>
        <ChatBar c/>
      </div>);
    } else {
      return (
        <div>
          
          {/* <Navbar currentUser = {this.state.currentUser.username = "Anonymous User"}/> */}
          <Navbar/>

          <MessageList messages = {this.state.messages}  />

          {/* Data Flow in Chatty - Pass currentUser using props */}
          <ChatBar 
          currentUser = {this.state.currentUser.username} 
          onNewPost= {this.onNewPost}
          onUpdatingUsername = {this.onUpdatingUsername} />

        </div>
      );
    }
  }
}

export default App;
