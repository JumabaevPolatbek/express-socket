const serialz = require('./serialz');
module.exports = async (io) => {
	const promises = [];
	io._nsps.forEach(async (nsp) => {
		const promise = nsp
			.fetchSockets()
			.then((sockets) => {
				return sockets.map((socket) =>
					serialz(socket, nsp.name)
				);
			});
		console.log(promise);
		return promises.push(promise);
	});
	return (await Promise.all(promises)).reduce(
		(acc, socket) => {
			acc.push(...socket);
			return acc;
		}
	);
};
