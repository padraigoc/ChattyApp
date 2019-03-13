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
        <ChatBar />
      </div>);
    } else {
      return (
        <div>
          <Navbar />

          <MessageList messages = {this.state.messages}/>

          {/* Data Flow in Chatty - Pass currentUser using props */}
          <ChatBar currentUser = {this.state.currentUser.username}/>

        </div>
      );
    }
  }

    // // once rendered 
    // componentDidMount() {
    //   // After half a second, set `loading` to false in the state.
    //   setTimeout(() => {
    //     this.setState({ 
    //       loading: false,
  
    //       //Data Flow in Chatty - Pass currentUser using props
    //       currentUser: {username: "Bob" },
  
    //       messages: [
    //         {
    //           username: "Bob",
    //           content: "Has anyone seen my marbles?",
    //         },
    //         {
    //           username: "Anonymous",
    //           content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    //         }
    //       ]
  
    //     }
    //     ); // this triggers a re-render!
    //   }, 500)
      
    // }









}

export default App;