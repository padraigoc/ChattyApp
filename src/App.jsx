import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import Messages from './Message.jsx';


class App extends Component {

  //initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
     };
  }

  // once rendered 
  componentDidMount() {
    // After half a second, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({ 
        loading: false,
        //Data Flow in Chatty - Pass currentUser using props
        currentUser: {name: "Bob" }
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
          <Messages />
          {/* Data Flow in Chatty - Pass currentUser using props */}
          <ChatBar currentUser = {this.state.currentUser.name}/>
        </div>
      );
    }
  }
}

export default App;
