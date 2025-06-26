import { useOutletContext } from 'react-router';
import HomeScreen from '../components/home-screen/home-screen';
import Navbar from '../components/navbar/navbar';
import { useEffect, useState } from 'react';
import type { HubConnection } from '@microsoft/signalr';

export default function Home() {
	const connection: HubConnection = useOutletContext();
	return (
		<>
			<Navbar />
			<HomeScreen connection={connection} />
		</>
	);
}
