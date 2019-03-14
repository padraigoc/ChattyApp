const express = require('express');
const SocketServer = require('ws').Server; //error will occur
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
    server
});

// When a client is connected
wss.on('connection', (ws) => {
    console.log('Client connected');

    //receives a message from our client :)
    ws.on('message', function incoming(data) {
        let dataObject = JSON.parse(data);
        console.log('Message from user ' + dataObject.username + ' with the following text: ' + dataObject.content);

        dataObject["id"] = uuidv1(); 
        //send data back!
        wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(dataObject));
        });
    });
    ws.on('close', () => console.log('Client disconnected'));
});