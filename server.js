const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors');
const app = express();

class Server_send {
    constructor() {
        this.username = "Server"
        this.colour = "black"
    }
}

const sever = new Server_send();

let users_count = 0;
let userdict = {};

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.send('CORS enabled!');
});

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const io = new Server(server, {
    cors: {
        origin: "\*", // Allow this origin
        methods: ["GET", "POST"], // Allow specific HTTP methods
        allowedHeaders: ["Content-Type"], // Allow specific headers
        credentials: true // Allow cookies and authentication
    }
});


io.on('connection', (socket) => {

    socket.on('user-class', (user) => {
        console.log(userdict);
        userdict[socket.id] = user;
        io.emit('chat-message-send', [sever, `${user.username} has entered the chat`]);
        console.log(`${user.username} connected`);

        console.log(userdict);

        let uerList = [];

        for (key in userdict) {
            uerList.push(userdict[key]);
        }

        io.emit('user-list', JSON.stringify(uerList));
    })
    
    socket.on('chat-message', (msg) => {
        console.log(`Received message: ${msg}`);
        io.emit('chat-message-send', msg);
    });
    
    socket.on('disconnect', () => {
        let leving = userdict[socket.id];
        console.log(`${userdict[socket.id]} disconnected`);


        delete userdict[socket.id]

        console.log(userdict);

        let uerList = [];

        for (key in userdict) {
            uerList.push(userdict[key]);
        }

        io.emit('user-list', JSON.stringify(uerList));

        // Broadcast a message to all connected clients
        io.emit('chat-message-send', [sever, `${leving.username} has left the chat`]);
        users_count -= 1;
        console.log(`Users connected: ${users_count}`);
        io.emit('users-count', users_count);
    });

    users_count += 1;
    io.emit('users-count', users_count);
    console.log(`Users connected: ${users_count}`);

    io.emit('server-all-good', "200");
})
