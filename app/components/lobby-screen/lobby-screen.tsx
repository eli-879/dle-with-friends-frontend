import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type AppState from '~/models/appState';
import type LobbyPlayer from '~/models/lobbyPlayer';
import type PlayerDtoIn from '~/models/playerDtoIn';

export default function LobbyScreen({ connection, nickname }: AppState) {
    const [players, setPlayers] = useState<LobbyPlayer[]>([]);
    let { roomId } = useParams();
    async function connectToLobby() {
        if (!connection) {
            console.log('Connection object error');
            return;
        }

        if ((await connection.state) !== 'Connected') {
            try {
                await connection.start();
                console.log('Connected to the lobby');
            } catch (error) {
                console.error('Error connecting to the lobby:', error);
            }
        }
        // await connection.invoke('JoinRoom', roomId);
        await loadPlayers();
    }

    async function loadPlayers() {
        if (connection && (await connection.state) === 'Connected') {
            try {
                await connection.invoke('GetPlayers', roomId);
            } catch (error) {
                console.error('Error loading players:', error);
            }
        }
    }

    useEffect(() => {
        if (!connection) return;

        connection.on('UserJoined', () => {
            console.log('User Joined');
        });

        connection.on('ReceivePlayers', (receivedPlayers) => {
            console.log('Recieved: ', receivedPlayers);
            const players: LobbyPlayer[] = [];
            receivedPlayers.forEach((rp: PlayerDtoIn) => {
                let player: LobbyPlayer = { name: rp.name };
                players.push(player);
            });

            setPlayers(players);
        });

        connectToLobby();
    }, [connection]);

    return (
        <>
            <h1>Room Id: {roomId}</h1>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>
        </>
    );
}
