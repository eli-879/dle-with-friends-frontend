import WordleSquare from './wordle-square/wordle-square';
import styles from './wordle-row.module.css';

export default function WordleRow() {
	return (
		<>
			<div className={styles.wordleRow}>
				<WordleSquare />
				<WordleSquare />
			</div>
		</>
	);
}
