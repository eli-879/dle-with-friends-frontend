import {
    HttpTransportType,
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from '@microsoft/signalr';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import theme from './theme';

export default function App() {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [nickname, setNickname] = useState('');
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
            navigate(`/lobby/${roomId}`);
        });

        setConnection(signalRConnection);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Outlet context={{ connection, nickname, setNickname }} />
        </ThemeProvider>
    );
}
