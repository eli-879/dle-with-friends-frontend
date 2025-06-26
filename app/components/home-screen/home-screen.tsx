import { Typography } from '@mui/material';
import styles from './home-screen.module.css';
import GameButtons from './game-buttons/game-buttons';
import type { HubConnection } from '@microsoft/signalr';

interface HomeScreenProps {
	connection: HubConnection;
}

export default function HomeScreen({ connection }: HomeScreenProps) {
	async function createRoom() {
		try {
			if (connection) {
				await connection.start();
				console.log('connected');

				await connection.invoke('CreateRoom');
			}
		} catch (e) {}
	}

	async function joinRoom() {
		try {
			if (connection) {
				await connection.start();

				console.log('connected');

				await connection.invoke('JoinRoom', 'hBzFp');
			}
		} catch (e) {}
	}

	return (
		<>
			<div className={styles.homeScreen}>
				<Typography variant='h1' component='h2'>
					Wordle With Friends
				</Typography>
				<GameButtons onCreateRoom={createRoom} onJoinRoom={joinRoom} />
			</div>
		</>
	);
}
