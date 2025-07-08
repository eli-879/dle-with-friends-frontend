import { useOutletContext } from 'react-router';
import GameScreen from '~/components/game-screen/game-screen';
import Navbar from '~/components/navbar/navbar';
import type AppState from '~/models/appState';

export default function Game() {
    const state: AppState = useOutletContext();

    return (
        <>
            <Navbar />
            <GameScreen
                connection={state.connection}
                nickname={state.nickname}
            />
        </>
    );
}
