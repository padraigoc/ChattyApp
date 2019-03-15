const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;


//New express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//WebSockets server
const wss = new SocketServer({server});


// When a client is connected
wss.on('connection', (ws) => {
    var message = {
        type: "NoOfUsers",
        msg: wss.clients.size,
        id: uuidv1()
    }

    //send number of connected clients back to clients
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(message));
    });


    //receives a message from our client
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
        //sends data back to clients
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(dataObject));
        });
    });


    ws.on('close', () => {
        //update number of connected users
        var message = {
            type: "NoOfUsers",
            msg: wss.clients.size,
            id: uuidv1()
        }
        //send number of connected clients back to clients
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(message));
        });

        console.log('Client disconnected - Current number of users :' + wss.clients.size)

    });
});