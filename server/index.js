const express = require('express');
const urlEncoded = express.urlencoded({ extended: true });
const dotEnv = require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const createRooms = require('./utils/room');
const serialz = require('./utils/serialz');
const rooms = require('./utils/room');
const port = process.env.PORT || 5000;

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['custom-header'],
		credentials: true,
	},
});
app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);
io.on('connect', async (socket) => {
	const roomsClient = await rooms(io);
	socket.on('join', ({ username, room }) => {
		socket.join(room);
		socket.emit('message', {
			data: {
				username,
				room,
			},
			message: `Hello ${username}`,
		});
		socket.emit('server_stats', {
			userId: socket.id,
			rooms: roomsClient[0].rooms,
			sids: '1',
			sockets: roomsClient[0].sockets,
		});
	});
	socket.on('sendMessage', (data) => {
		// console.log(data);
	});
});

server.listen(port, () => {
	console.log('Server running port ' + port);
});
