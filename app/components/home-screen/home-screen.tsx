import { TextField, Typography } from '@mui/material';
import { redirect, useNavigate } from 'react-router';
import type AppState from '~/models/appState';
import GameButtons from './game-buttons/game-buttons';
import styles from './home-screen.module.css';

export default function HomeScreen({
    connection,
    nickname,
    setNickname,
}: AppState) {
    const navigate = useNavigate();

    async function createRoom() {
        try {
            if (connection) {
                await connection.start();
                console.log('connected');

                await connection.invoke('CreateRoom', nickname);
                return redirect('/lobby');
            }
        } catch (e) {}
    }

    async function joinRoomScreen() {
        navigate('/join-game');
    }

    return (
        <>
            <div className={styles.homeScreen}>
                <Typography variant="h1" component="h2">
                    Wordle With Friends
                </Typography>

                <TextField
                    id="outlined-basic"
                    label="Enter your nickname"
                    variant="outlined"
                    value={nickname}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNickname!(event.target.value);
                    }}
                />

                <GameButtons
                    disableButtons={nickname.length === 0}
                    onCreateRoom={createRoom}
                    onJoinRoom={joinRoomScreen}
                />
            </div>
        </>
    );
}
