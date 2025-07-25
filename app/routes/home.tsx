import { useOutletContext } from 'react-router';
import type AppState from '~/models/appState';
import HomeScreen from '../components/home-screen/home-screen';
import Navbar from '../components/navbar/navbar';

export default function Home() {
    const state: AppState = useOutletContext();
    return (
        <>
            <Navbar />
            <HomeScreen
                connection={state.connection}
                nickname={state.nickname}
                setNickname={state.setNickname}
            />
        </>
    );
}
