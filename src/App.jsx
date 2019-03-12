import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import Messages from './Message.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Messages />
        <ChatBar />  
  
      </div>
    );
  }
}

export default App;
