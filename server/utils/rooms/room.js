const { readFile, writeFile } = require('fs');
const pathtoJson = './rooms.json';
const createRooms = (rooms) => {
	console.log('Rooms create', rooms);
	readFile(pathtoJson, (err, data) => {
		if (err) {
			console.log(err);
		}
		const parse = JSON.parse(data);
		console.log('Parsing data ' + parse);
		writeFile(
			pathtoJson,
			JSON.stringify(rooms),
			(err) => {
				if (err) {
					console.log(err);
				}
			}
		);
	});
	// writeFile(
	// 	pathtoJson,
	// 	JSON.stringify(rooms),
	// 	(err, result) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// );
};
module.exports = createRooms;
