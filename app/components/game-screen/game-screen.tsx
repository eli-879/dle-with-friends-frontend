import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type AppState from '~/models/appState';
import type CurrentGuess from '~/models/currentGuess';
import type GamePlayer from '~/models/gamePlayer';
import type PlayerDtoIn from '~/models/playerDtoIn';
import styles from './game-screen.module.css';
import Keyboard from './keyboard/keyboard';
import PlayerBoard from './player-board/player-board';

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
        setCurrentGuess({
            ...currentGuess,
            currentWord: currentGuess.currentWord + keyValue,
        });
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

        connection.on('ReceivePlayers', handleReceivePlayers);

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
                        guessFeedbacks={
                            playerStates.find((ps) => ps.name === nickname)
                                ?.gameState.guessFeedbacks!
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
