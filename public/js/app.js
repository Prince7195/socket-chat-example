$(function() {
    // it takes to load the socket.io-client, which exposes a io global, and then connect.
    // I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.
    var socket = io();
    // Results: "a user connected" message logged in the cmd for every reload of that url.

    $('form').submit(function() {
        // emitting the value of input box when send button is clicked (using event emitter)
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    // when we capture the "chat message" event we'll include to the UI
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    });

});