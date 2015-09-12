/**
 * Created by shack4 on 9/1/15.
 */

// INSTALL node.js
    // Set IDE to node.js install location .... /usr/local/bin
// *In Terminal* npm install --save express@4.10.2
// *In Terminal* npm install --save socket.io

// *Run Server(make sure "cd" is set to project folder)* node index.js


var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")( http);
var userCount=0;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//test code
/*io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});*/


io.on('connection', function(socket){
    userCount++;
    console.log('Users Connected: '+userCount);
    socket.on('disconnect', function(){
        userCount--;

        console.log('*DC* Users Connected: '+userCount);
    });
    socket.on('chat message', function(msg){
        io.emit("chat message", msg);
        //console.log('message: ' + msg);
    });
});

http.listen(3003, function(){
    console.log('listening on *:3003');
});



