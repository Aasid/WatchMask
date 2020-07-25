require('dotenv').config();
var cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var socket = require('socket.io-client')('ws://localhost:8756');

socket.on('connect', function () {
	console.log("connected")
	socket.emit('feed', 'initiate');
});
socket.on('event', function () {
	console.log("event")
});
socket.on("maskDetection", (data) => {
	console.log(data);
  });
socket.on('disconnect', function () {
	console.log('disconnected!');
});

// Init Middleware
app.use(express.static('client/dist'));
app.use('/alerts', express.static('public/alerts'));
app.use(cors());
app.use(express.json({ extended: false }));

io.on('maskDetection', function (socket) {
	socket.emit('announcements', { message: 'A new connection made!' });
});

// app.get('/', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

// Configuring Host and Port.
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '127.0.0.1';

app.get('/**', (req, res) => {
	res.redirect('/');
});

app.listen(PORT, HOST, () => console.log(`Server started running on : http://${HOST}:${PORT}`));
