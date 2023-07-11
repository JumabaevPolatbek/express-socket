import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');
const Admin = () => {
	const { state } = useLocation();
	const [sockets, setSockets] = React.useState();
	const [rooms, setRooms] = React.useState();
	React.useEffect(() => {
		socket.emit('join', state);
	}, [state]);
	React.useEffect(() => {
		socket.on('server_stats', (data) => {
			if (data) {
				setRooms(data.rooms);
				setSockets(data.sockets);
			}
		});
	}, []);
	return (
		<div className='container'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col items-center w-[400px]'>
					<Link to={'/clients'}>Clients</Link>
					<Link to={'/rooms'}>Rooms</Link>
					<Link to={'/sockets'}>Rooms</Link>
				</div>
				<div className='border rounded'>
					<h2 className='text-[36px] text-center'>
						Clients
					</h2>
					<div className='flex flex-col'>
                        
                    </div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
