import React, { Component } from 'react';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
    }
  }
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="users">Connected users: {this.props.connectedUsers} </p>
      </nav>
    );
  }
}

export default Navbar;