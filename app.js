var express = require('express');
var app = express();

// import socket.io
const io = require('socket.io')(); // instantiate the socket.io library right away with the () method -> makes it run

const port = process.env.PORT || 3030;

// this tells express where static files are js, images, css 
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// this is for all of our socket.io messaging 

// attach socket.io
io.attach(server);

io.on('connection', function(socket){  //socket is your connection
    console.log('user connected');
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });

   

    socket.on('chat_message', function(msg) {
        console.log(msg);

    
        io.emit('new_message', { id: socket.id, message: msg })
    })

    //listen for a disconnect event
    socket.on('disconnect', function() {
        console.log('a user disconnected');

        message = `${socket.id} has left the chat!`;
        io.emit('user_disconnect', message);
    })
})