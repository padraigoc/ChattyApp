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
      messages: [],
      currentUser: ""
     };
  }

  // once rendered 
  componentDidMount() {
    // After half a second, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({ 
        loading: false,

        //Data Flow in Chatty - Pass currentUser using props
        currentUser: {username: "Bob" },

        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]

      }
      ); // this triggers a re-render!
    }, 500)
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
}

export default App;