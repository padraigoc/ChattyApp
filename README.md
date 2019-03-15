Chatty App
=====================

Single page application built using React and Web sockets. Allows bidirectional communication between two clients. 

## Workflow video

[Available on Dropbox](https://www.dropbox.com/s/5ll620i82cdp5yf/ChattyApp.mov?dl=0)

## Usage

Install the dependencies in both the root directory and chatty_server.

Open two terminal windows, in the first follow these steps: 
1. Install dependencies using the `npm install` command.
2. To start, type `npm start`. 

In the second terminal: 
1. Ensure you're in the chatty_server directory. 
2. Type `npm install`. 
3. Type `npm start`. 

Then open two browser windows and navigate to http://localhost:3000.

## Tech Stack

* React
* WebSockets
* JSX with Babel
* Node.js
* Express

## Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* ws
* Express
* UUID
