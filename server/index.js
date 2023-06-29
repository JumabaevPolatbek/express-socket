const express = require('express');
const urlEncoded = express.urlencoded({ extended: true });
const dotEnv = require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const createRooms = require('./utils/rooms/room');
const port = process.env.PORT || 5000;

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});
app.use(express.json());

const rooms = io.of('/').adapter.rooms;
// createRooms(rooms);
console.log(rooms, 'Room');
io.on('connection', (socket) => {
	// console.log('Rooms ', socket.rooms);
	// console.log('Socket Id ', socket.id);
	// io.to(socket.id).emit('hi', 'Hello');
	// createRooms(socket.rooms);
	var rooms = Object.keys(socket.rooms);
	// console.log(rooms);
	socket.on('join', ({ username, room }) => {
		socket.join(room);
		socket.emit('message', {
			data: {
				username,
				room,
			},
			message: `Hello ${username}`,
		});
	});
	socket.on('sendMessage', (data) => {
		console.log(data);
	});
});
server.listen(port, () => {
	console.log('Server running port ' + port);
});
