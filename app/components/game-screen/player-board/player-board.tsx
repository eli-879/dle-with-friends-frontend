import type CurrentGuess from '~/models/currentGuess';
import type { GuessFeedback } from '~/models/guessFeedbacks';
import BoardRow from './board-row/board-row';
import styles from './player-board.module.css';

interface PlayerBoardInfo {
    currentGuess: CurrentGuess;
    guessFeedbacks: GuessFeedback[][];
}

export default function PlayerBoard({
    currentGuess,
    guessFeedbacks,
}: PlayerBoardInfo) {
    const rows = [0, 1, 2, 3, 4, 5];

    return (
        <>
            <div className={styles.playerBoard}>
                {rows.map((row, index) => {
                    return <BoardRow key={index}></BoardRow>;
                })}
            </div>
        </>
    );
}
