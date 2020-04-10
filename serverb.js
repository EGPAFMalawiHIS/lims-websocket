'use strict';

// for our server we use both express and socket.io
// express is used for serving our static content
// socket.io is used for all messages, in and out


// Code Author: Charlie Maere March 2020
// Company: EGPAF Malawi

const
	express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken'),
	helmet = require('helmet'),
	cors = require('cors'),
	moment = require('moment'),
  cron = require("node-cron"),
  request = require('request'),
  fs = require("fs"),
	bodyParser  = require('body-parser'),
	chaPort        = process.env.PORT || 3011,
	chaAvatar = '1-81-02.svg',
  ipaddress = '127.0.0.1';




var users = [];
var db = null;
var JWT_SECRET = '';


// basic setup
app.use(helmet());
app.use(cors());
app.use(express.static('www'));

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
 

// home
app.get('/', (req, res) => {
	res.sendfile('index.html');
});
 




// setup socket.io
io.on('connection', socket => {


	// for now, all users are your contacts
	socket.on('orders', data => {
		
		console.log('let see',data);
    socket.broadcast.emit('orders',data);

	});

  socket.on('results', data => {
    
    console.log('let see',data);
    socketbroadcast.emit('results',data);

  });





	// remove a connected user from the list of online users
	var disconnect = () => {
		
		
		console.log(socket.id + ' could not fully disconnect.');
	};

	socket.on('logout', disconnect);
	socket.on('disconnect', disconnect);
});




const port = process.env.PORT || 3011 ;
http.listen(port, ipaddress, () => {
	console.log('listening on port', port);
});