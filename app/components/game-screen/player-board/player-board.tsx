import type CurrentGuess from '~/models/currentGuess';
import type { GuessFeedback } from '~/models/guessFeedbacks';
import BoardRow from './board-row/board-row';
import styles from './player-board.module.css';
import type GameState from '~/models/gameState';

interface PlayerBoardInfo {
    currentGuess: CurrentGuess;
    gameState: GameState;
}

export default function PlayerBoard({
    currentGuess,
    gameState,
}: PlayerBoardInfo) {
    const rows = [0, 1, 2, 3, 4, 5];

    // const rowsToDisplay = gameState?.guesses ?? [];
    const rowsToDisplay = ['mouse', 'house'];
    const guessFeedbacks = [
        [0, 1, 2, 2, 2],
        [1, 2, 2, 2, 2],
    ];

    let boardRowInfo = rowsToDisplay.map((word, index) => {
        return {
            guess: word,
            feedback: guessFeedbacks[index],
        };
    });

    if (boardRowInfo.length < 6) {
        boardRowInfo.push({ guess: currentGuess.currentWord, feedback: [] });
    }

    while (boardRowInfo.length < 6) {
        boardRowInfo.push({ guess: '', feedback: [] });
    }

    return (
        <>
            <div className={styles.playerBoard}>
                {/* {gameState..map((feedback, index) => {
                    return <BoardRow key={index}></BoardRow>;
                })} */}

                {boardRowInfo.map((row, index) => {
                    return (
                        <BoardRow
                            key={index}
                            guess={row.guess}
                            feedback={row.feedback}
                        ></BoardRow>
                    );
                })}
            </div>
        </>
    );
}
