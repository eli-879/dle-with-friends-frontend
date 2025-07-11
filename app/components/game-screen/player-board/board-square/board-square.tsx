import { GuessFeedback } from '~/models/guessFeedbacks';
import styles from './board-square.module.css';
import { stepLabelClasses } from '@mui/material';

interface BoardSquareProps {
    letter: string;
    feedback: GuessFeedback;
}

export default function BoardSquare({ letter, feedback }: BoardSquareProps) {
    let style = {};

    switch (feedback) {
        case GuessFeedback.Correct: {
            style = { backgroundColor: 'rgb(83, 141, 78)' };
            break;
        }
        case GuessFeedback.Incorrect: {
            style = { backgroundColor: 'none' };
            break;
        }
        case GuessFeedback.Misplaced: {
            style = { backgroundColor: 'rgb(181, 159, 59)' };
            break;
        }
    }

    return (
        <div className={styles.boardSquare} style={style}>
            {letter.toUpperCase()}
        </div>
    );
}
