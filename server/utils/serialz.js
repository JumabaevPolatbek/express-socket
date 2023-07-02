const serializeData = (data) => {
	const { _admin, ...obj } = data;
	return obj;
};

module.exports = (socket, nsp) => {
	const clientId = socket.data?._admin?.clientId;
	const transport = socket.data?._admin?.transport;
	const address =
		socket.handshake.headers['cf-connecting-ip'] ||
		socket.handshake.headers['x-forwarded-for'] ||
		socket.handshake.address;
	return {
		id: socket.id,
		clientId,
		transport,
		nsp,
		data: serializeData(socket.data),
		handshake: {
			address,
			headers: socket.handshake.headers,
			query: socket.handshake.query,
			issued: socket.handshake.issued,
			secure: socket.handshake.secure,
			time: socket.handshake.time,
			url: socket.handshake.url,
			xdomain: socket.handshake.xdomain,
			// ignore auth and other attributes like sessionStore
		},
		rooms: [...socket.rooms],
	};
};
