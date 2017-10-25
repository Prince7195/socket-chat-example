var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// assigning the public folder to assets folder
app.use('/assets', express.static(__dirname + '/public'));

// setting the view engine to ejs
app.set('view engine', 'ejs');

// default home page
app.get('/', function(req, res) {
    res.render('welcome');
});

// chart page
app.get('/chat', function(req, res) {
    res.render('chat');
});

//  I initialize a new instance of socket.io by passing the http (the HTTP server) object. Then I listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function(socket) {
    console.log('specific user connection');

    // used when loged out or connection disconnected
    socket.on('disconnect', function() {
        console.log('current user disconnected');
    });

    //each socket also fires a special "disconnect" event. 
    socket.on('chat message', function(msg) {

        // emitting back to the sender
        io.emit('chat message', msg);
    });
});

// listening to the port 3000
http.listen(3000, function() {
    console.log('listening to 3000');
});