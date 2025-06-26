import WordleRow from './wordle-row/wordle-row';
import styles from './wordle-grid.module.css';

export default function WordleGrid() {
	return (
		<>
			<div className={styles.wordleGrid}>
				<WordleRow />
				<WordleRow />
			</div>
		</>
	);
}
