import { ThemeProvider } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { HubConnectionBuilder, HttpTransportType, LogLevel, HubConnection } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
export default function App() {
	const [connection, setConnection] = useState<HubConnection | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		console.log('HubConndectionProvider mounted');

		const signalRConnection = new HubConnectionBuilder()
			.withUrl('https://localhost:7224/gamehub', {
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets,
			})
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();

		signalRConnection.on('SendNewRoom', (roomId) => {
			console.log(roomId);
			navigate('/lobby');
		});

		signalRConnection.on('UserJoined', () => {
			console.log('User Joined');
		});

		setConnection(signalRConnection);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Outlet context={connection} />
		</ThemeProvider>
	);
}
