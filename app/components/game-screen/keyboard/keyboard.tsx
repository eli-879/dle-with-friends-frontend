import type CurrentGuess from '~/models/currentGuess';
import KeyboardRow from './keyboard-row/keyboard-row';
import styles from './keyboard.module.css';

interface KeyboardProps {
    currentGuess: CurrentGuess;
    setCurrentGuess: (newGuess: CurrentGuess) => void;
}

const keyboardValues = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export default function Keyboard({}: KeyboardProps) {
    return (
        <>
            <div className={styles.keyboard}>
                {keyboardValues.map((rowValues, index) => {
                    return (
                        <KeyboardRow
                            key={index}
                            rowValues={rowValues}
                        ></KeyboardRow>
                    );
                })}
            </div>
        </>
    );
}
