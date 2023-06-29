const { writeFile, readFile } = require('fs');
const pathtoJson = require('./users.json');

const createUser = (username, { socketId, room }) => {
	const user = {
		username: username,
		id: socketId,
		room: room,
	};
	readFile(pathtoJson, (err, data) => {
		if (err) {
			console.log(err);
		}
		const parse = JSON.parse(data);
		parse.push(user);
		writeFile(pathtoJson, JSON.stringify(parse));
	});
};

const getUsers = () => {
	const users = [];
	readFile(pathtoJson, (err, data) => {
		if (err) {
			console.log(err);
		}
		users = JSON.parse(data);
	});
	return users;
};

const delUser = (socketId) => {
	readFile(pathtoJson, (err, data) => {
		if (err) {
			console.log(err);
		}
		const parse = JSON.parse(data);
		writeFile(
			pathtoJson,
			JSON.stringify(
				parse.filter((user) => user.id !== socketId)
			)
		);
	});
};

module.exports = { createUser, getUsers, delUser };
