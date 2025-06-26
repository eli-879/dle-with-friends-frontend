import { Paper } from '@mui/material';
import styles from './wordle-square.module.css';

export default function WordleSquare() {
	return (
		<div className={styles.wordleSquare}>
			<Paper
				sx={{
					height: '100%',
				}}
			>
				hi
			</Paper>
		</div>
	);
}
