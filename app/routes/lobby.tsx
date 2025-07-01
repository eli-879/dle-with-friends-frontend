import { useOutletContext } from 'react-router';
import LobbyScreen from '~/components/lobby-screen/lobby-screen';
import Navbar from '~/components/navbar/navbar';
import type AppState from '~/models/appState';

export default function Lobby() {
    const state: AppState = useOutletContext();

    return (
        <>
            <Navbar />
            <LobbyScreen
                connection={state.connection}
                nickname={state.nickname}
            />
        </>
    );
}
