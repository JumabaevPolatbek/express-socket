import React from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');
type Location = {
	username?: string;
	room?: string;
};
const Room = () => {
	const { state } = useLocation();
	const [data, setData] = React.useState();
	const [message, setMessage] = React.useState('');
	const [servers, setServers] = React.useState<any>();
	var room = state.room;
	React.useEffect(() => {
		socket.emit('join', state);
		socket.emit('get_rooms', '');
	}, [state]);
	React.useEffect(() => {
		socket.on('message', (message) => {
			setData(message);
		});
		socket.on('server_stats', (servers) => {
			console.log('Rooms', servers);
		});
		// socket.on('rooms_list', (data) => {
		// 	console.log('Data', data);
		// });
		// socket.on('connection', (e) => {
		// 	console.log(e);
		// });
	}, []);
	const sendMessage = () => {
		socket.emit('sendMessage', { message, room });
		setMessage('');
	};
	console.log(socket);
	return (
		<div className='container mx-auto'>
			<div className='flex flex-col'>
				<div className='h-[500px] overflow-y-scroll bg-zinc-500'></div>
				<div className='flex justify-between items-center'>
					<input
						className='flex-1 border rounded-sm py-2 px-5'
						onChange={(e) =>
							setMessage(e.target.value)
						}
						value={message}
					/>
					<button
						className='px-5 py-1 text-[24px] bg-slate-600 border rounded-md'
						onClick={sendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Room;
