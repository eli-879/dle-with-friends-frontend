import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type AppState from '~/models/appState';
import type CurrentGuess from '~/models/currentGuess';
import type GamePlayer from '~/models/gamePlayer';
import type PlayerDtoIn from '~/models/playerDtoIn';
import styles from './game-screen.module.css';
import Keyboard from './keyboard/keyboard';
import PlayerBoard from './player-board/player-board';
import type GameState from '~/models/gameState';

export const GameContext = createContext<{
    currentGuess: CurrentGuess;
    handleEditCurrentGuess: (keyValue: string) => void;
}>({
    currentGuess: {
        currentRow: 0,
        currentWord: '',
    },
    handleEditCurrentGuess: (keyValue: string) => {},
});

export default function GameScreen({ connection, nickname }: AppState) {
    const [playerStates, setPlayerStates] = useState<GamePlayer[]>([]);
    const [currentGuess, setCurrentGuess] = useState<CurrentGuess>({
        currentRow: 0,
        currentWord: '',
    });

    let { gameId } = useParams();

    async function connectToLobby() {
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

        await loadPlayers();
    }

    async function loadPlayers() {
        if (connection && connection.state === 'Connected') {
            try {
                console.log(gameId);
                await connection.invoke('GetPlayers', gameId);
            } catch (error) {
                console.error('Error loading players:', error);
            }
        }
    }

    function handleEditCurrentGuess(keyValue: string) {
        createNewGuess(keyValue).then((res) => {
            setCurrentGuess({
                ...currentGuess,
                currentWord: res,
            });
        });
    }

    async function createNewGuess(keyValue: string): Promise<string> {
        console.log('new guess', keyValue);
        let current = currentGuess.currentWord;

        if (current.length === 5 && keyValue !== 'Enter' && keyValue !== '⌫') {
            return Promise.resolve(current);
        }

        if (keyValue === '⌫') {
            return Promise.resolve(current.slice(0, current.length - 1));
        }

        if (keyValue === 'Enter') {
            console.log('invoke');
            await connection.invoke('SendGuess', gameId, nickname, current);
            return Promise.resolve('');
        }

        return Promise.resolve(current + keyValue);
    }

    useEffect(() => {
        if (!connection) return;

        const handleReceivePlayers = (receivedPlayers: PlayerDtoIn[]) => {
            const gamePlayers: GamePlayer[] = receivedPlayers.map((rp) => {
                return {
                    id: rp.id,
                    name: rp.name,
                    gameState: rp.gameState,
                };
            });
            console.log(receivedPlayers, gamePlayers);
            setPlayerStates(gamePlayers);
        };

        const handleReceieveGuess = (receivedPlayers: PlayerDtoIn[]) => {
            console.log('Received Guess', receivedPlayers);
        };

        connection.on('ReceivePlayers', handleReceivePlayers);

        connection.on('ReceiveGuess', handleReceieveGuess);
        connectToLobby();

        return () => {
            connection.off('ReceivePlayers', handleReceivePlayers);
        };
    }, [connection]);

    useEffect(() => {
        console.log('Updated player states:', playerStates);
    }, [playerStates]);

    useEffect(() => {
        console.log('updated', currentGuess);
    }, [currentGuess]);

    const value = { currentGuess, handleEditCurrentGuess };

    return (
        <>
            <div className={styles.gameScreen}>
                <GameContext value={value}>
                    <PlayerBoard
                        currentGuess={currentGuess}
                        gameState={
                            playerStates.find((ps) => ps.name === nickname)
                                ?.gameState!
                        }
                    ></PlayerBoard>
                    <Keyboard
                        currentGuess={currentGuess}
                        setCurrentGuess={setCurrentGuess}
                    ></Keyboard>
                </GameContext>
            </div>
        </>
    );
}
