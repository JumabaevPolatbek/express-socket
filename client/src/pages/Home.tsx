import React from 'react';

import { Link } from 'react-router-dom';
const Home = () => {
	const [name, setName] = React.useState<string>('');
	return (
		<div className='container mx-auto flex flex-col'>
			<input
				onChange={(e) => setName(e.target.value)}
				className='py-2 px-3 rounded-md border-blue-400 border'
			/>
			<Link
				to={
					name === 'admin'
						? '/admin/clients'
						: '/room'
				}
				state={{
					username: name,
					room: name,
				}}
				className='py-2 px-3 border rounded text-center'
			>
				Sign in
			</Link>
		</div>
	);
};

export default Home;
