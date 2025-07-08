import { useContext } from 'react';
import { GameContext } from '../../game-screen';
import styles from './keyboard-button.module.css';
interface KeyboardButtonProps {
    keyValue: string;
}

export default function KeyboardButton({ keyValue }: KeyboardButtonProps) {
    const { currentGuess, handleEditCurrentGuess } = useContext(GameContext);

    function modifyCurrentGuess() {}

    return (
        <div
            className={styles.keyboardButton}
            onClick={() => handleEditCurrentGuess(keyValue)}
        >
            {keyValue}
        </div>
    );
}
