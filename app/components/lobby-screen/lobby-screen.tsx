import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type AppState from '~/models/appState';
import type LobbyPlayer from '~/models/lobbyPlayer';
import type PlayerDtoIn from '~/models/playerDtoIn';

export default function LobbyScreen({ connection, nickname }: AppState) {
    const [players, setPlayers] = useState<LobbyPlayer[]>([]);
    let { roomId } = useParams();
    const navigate = useNavigate();

    async function connectToLobby() {
        console.log('Trying to connect');
        if (!connection) {
            console.log('Connection object error');
            return;
        }

        if (connection.state !== 'Connected') {
            try {
                await connection.start();
                console.log('Connected to the lobby');
            } catch (error) {
                console.error('Error connecting to the lobby:', error);
            }
        }

        try {
            // Rejoin the room using roomId from the URL
            console.log(`Rejoining room: ${roomId}`);
            await connection.invoke('JoinRoom', roomId);
            console.log(`Successfully rejoined room: ${roomId}`);
        } catch (error) {
            console.error('Error rejoining room:', error);
        }

        // await connection.invoke('JoinRoom', roomId);
        await loadPlayers();
    }

    async function loadPlayers() {
        if (connection && connection.state === 'Connected') {
            try {
                console.log(roomId);
                await connection.invoke('GetPlayers', roomId);
            } catch (error) {
                console.error('Error loading players:', error);
            }
        }
    }

    function startGame() {
        if (connection && connection.state === 'Connected') {
            connection.invoke('StartGame', roomId);
        }
    }

    useEffect(() => {
        console.log(connection);
        if (!connection) return;

        const handleUserJoined = () => {
            console.log('User Joined');
        };

        const handleReceivePlayers = (receivedPlayers: PlayerDtoIn[]) => {
            console.log('Received: ', receivedPlayers);
            const players: LobbyPlayer[] = receivedPlayers.map((rp) => ({
                name: rp.name,
            }));
            setPlayers(players);
        };

        const handleGameStarted = () => {
            navigate(`/game/${roomId}`);
        };

        // Attach SignalR event listeners
        connection.on('UserJoined', handleUserJoined);
        connection.on('ReceivePlayers', handleReceivePlayers);
        connection.on('GameStarted', handleGameStarted);

        connectToLobby();

        // Cleanup SignalR event listeners when the component unmounts or connection changes
        return () => {
            connection.off('UserJoined', handleUserJoined);
            connection.off('ReceivePlayers', handleReceivePlayers);
            connection.off('GameStarted', handleGameStarted);
        };
    }, [connection]);

    return (
        <>
            <h1>Room Id: {roomId}</h1>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>
            <Button variant="contained" onClick={startGame}>
                Start Game
            </Button>
        </>
    );
}
