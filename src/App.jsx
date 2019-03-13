import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  //initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      currentUser: {username: "Bob" },

      messages: [
        {
          id:1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id:2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]


     };
     this.onNewPost = this.onNewPost.bind(this);

  }

  //receiving new post
  onNewPost(content) {
    console.log("This is the parent: " + content);

    //adds message to array
    const newMessage = {id: content.id, username: this.state.currentUser.username, content: content};
    const messages = this.state.messages.concat(newMessage);

    this.setState({
      messages: messages,
      loading: false
    })
 
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
       // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        messages: messages,
        loading: false
      })
      // Update the state of the app component.

    }, 3000);
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
          <Navbar />

          <MessageList messages = {this.state.messages}  />

          {/* Data Flow in Chatty - Pass currentUser using props */}
          <ChatBar currentUser = {this.state.currentUser.username} onNewPost={ this.onNewPost } />

        </div>
      );
    }


    //receiving a message

    // onMessageReceived = (message) => {

    //   const newMessage = {
    //     user = (this.state.currentUser.username),
    //     content = //get content here

    //   }
    // }



  }




}

export default App;