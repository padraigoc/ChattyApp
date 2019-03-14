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

        dataObject["id"] = uuidv1(); //need to update to random key
        //send data back!
        wss.clients.forEach(function each(client) {
            //if (client.readyState === ws.readyState) {
                //console.log("we are in the broadcasting data");
                client.send(JSON.stringify(dataObject));
            //}
        });
    });

    //broadcast('Sending a message from our server');

    //   ws.on('open', function open() {
    //     ws.send('something');
    //   });

    //When a client closes the socket.
    ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast to all.
// wss.broadcast = function broadcast(data) {
//     wss.clients.forEach(function each(client) {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(data);
//         }
//     });
// };