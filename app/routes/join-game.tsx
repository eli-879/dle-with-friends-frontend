import { useOutletContext } from 'react-router';
import JoinGameScreen from '~/components/join-game-screen/join-game-screen';
import Navbar from '~/components/navbar/navbar';
import type AppState from '~/models/appState';

export default function JoinGame() {
    const state: AppState = useOutletContext();

    return (
        <>
            <Navbar />
            <JoinGameScreen
                connection={state.connection}
                nickname={state.nickname}
            />
        </>
    );
}
