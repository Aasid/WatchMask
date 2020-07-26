require('dotenv').config();
var cors = require('cors');
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');

const io = socketio(server);

io.on('connection', (socket) => {
	console.log('New client connected');

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

var socket = require('socket.io-client')('ws://localhost:8756');

socket.on('connect', function () {
	socket.emit('feed', 'initiate');
});

socket.on('emit', function (data) {
	console.log(data);
});

socket.on('event', function (data) {});
socket.on('disconnect', function () {
	console.log('disconnected!');
});

socket.on('maskDetection', function (data) {
	console.log(data);
	socket.emit('FromAPI', data);
});

// Init Middleware
app.use(express.static('../dist/'));
app.use('/alerts', express.static('public/alerts'));
app.use(cors());
app.use(express.json({ extended: false }));

// Configuring Host and Port.
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '127.0.0.1';

app.get('/**', (req, res) => {
	res.redirect('/');
});

server.listen(PORT, HOST, () => console.log(`Server started running on : http://${HOST}:${PORT}`));
