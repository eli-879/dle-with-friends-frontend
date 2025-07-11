import type { GuessFeedback } from '~/models/guessFeedbacks';
import BoardSquare from '../board-square/board-square';
import styles from './board-row.module.css';

interface BoardRowProps {
    guess: string;
    feedback: GuessFeedback[];
}

export default function BoardRow({ guess, feedback }: BoardRowProps) {
    const squares = [0, 1, 2, 3, 4];

    if (guess === '') {
        guess = '     ';
    }

    if (guess.length < 5) {
        const addSpace = ' '.repeat(5 - guess.length);
        guess = guess + addSpace;
    }

    return (
        <>
            <div className={styles.boardRow}>
                {guess.split('').map((letter, index) => {
                    return (
                        <BoardSquare
                            key={index}
                            letter={letter}
                            feedback={feedback[index]}
                        ></BoardSquare>
                    );
                })}
            </div>
        </>
    );
}
