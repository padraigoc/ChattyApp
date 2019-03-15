import React, { Component } from 'react';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: this.props.currentUser,
    }

    
}


  render() {
    console.log(this.props.currentUser)
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p>Connected users: {this.props.connectedUsers} </p>
      </nav>
        
    );
  }
}

export default Navbar;