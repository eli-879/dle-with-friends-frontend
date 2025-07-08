import KeyboardButton from '../keyboard-button/keyboard-button';
import styles from './keyboard-row.module.css';
interface KeyboardRowProps {
    rowValues: string[];
}

export default function KeyboardRow({ rowValues }: KeyboardRowProps) {
    return (
        <>
            <div className={styles.keyboardRow}>
                {rowValues.map((letter, index) => {
                    return (
                        <KeyboardButton
                            key={index}
                            keyValue={letter}
                        ></KeyboardButton>
                    );
                })}
            </div>
        </>
    );
}
