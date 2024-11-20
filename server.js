const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors');
const app = express();

let users = 0;

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
    console.log('A user connected');
    io.emit('chat-message-send', ['Sever','A user has entered the chat']);
    
    socket.on('chat-message', (msg) => {
        console.log(`Received message: ${msg}`);
        io.emit('chat-message-send', [socket.id, msg]);
    });
    
    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Broadcast a message to all connected clients
        io.emit('chat-message-send', ['Server', 'A user has left the chat']);
        users -= 1;
        console.log(`Users connected: ${users}`);
        io.emit('users-count', users);
    });

    users += 1;
    io.emit('users-count', users);
    console.log(`Users connected: ${users}`);
})
