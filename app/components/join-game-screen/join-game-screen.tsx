import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type AppState from '~/models/appState';
import styles from './join-game-screen.module.css';

export default function JoinGameScreen({ connection, nickname }: AppState) {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();
    async function joinRoom() {
        console.log(nickname);

        if (!connection) {
            console.log('Connection object no created!');
            return;
        }

        if ((await connection.state) !== 'Connected') {
            try {
                await connection.start();
                console.log('Connected to the server');
            } catch (e) {}
        }

        await connection.invoke('JoinRoom', roomCode, nickname);
    }

    useEffect(() => {
        if (!connection) return;

        connection.on('UserJoined', () => {
            console.log('User joined room', roomCode);
            navigate(`/lobby/${roomCode}`);
        });

        return () => {
            connection.off('UserJoined');
        };
    }, [connection, roomCode]);

    return (
        <>
            <div className={styles.joinGameScreen}>
                <Typography variant="h1" component="h2">
                    Wordle With Friends
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Enter game code"
                    variant="outlined"
                    value={roomCode}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setRoomCode(event.target.value);
                    }}
                />
                <Button variant="contained" onClick={joinRoom}>
                    Join Game
                </Button>
            </div>
        </>
    );
}
