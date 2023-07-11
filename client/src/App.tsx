import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/room'
					element={<Room />}
				/>
				<Route
					path='/admin/clients'
					element={<Admin />}
				/>
			</Routes>
		</>
	);
}

export default App;
