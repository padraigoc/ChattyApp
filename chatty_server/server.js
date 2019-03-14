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

        switch (dataObject.type) {

            case "postMessage":
                console.log(
                    '\n*********** MESSAGE FROM CLIENT TO SERVER ***********' +
                    '\nMessage from user: ' + dataObject.username +
                    ' \nwith the following text: ' + dataObject.content +
                    ' \nthe message type is: ' + dataObject.type + '\n');

                //send back type and unique user ID
                dataObject["msgType"] = "incomingMessage";
                dataObject["id"] = uuidv1();
            break;

            case "postNotification":
                console.log(
                    '\n*********** USERNAME NOTIFICATION FROM CLIENT TO SERVER ***********' +
                    '\nOld Username: ' + dataObject.oldUsername +
                    ' \nNew Username: ' + dataObject.newUsername +
                    ' \nthe message type is: ' + dataObject.type + '\n');
                //send back type
                dataObject["msgType"] = "incomingNotification";
                dataObject["id"] = uuidv1();
                break;
                
            default:
                throw new Error("Unknown event type " + data.type);

        };
        console.log('\n*********** MESSAGE FROM SERVER TO CLIENT(S) ***********' +
            '\n Message sent back to all connected devices');
        //send data back!
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(dataObject));
        });
    });
    ws.on('close', () => console.log('Client disconnected'));
});