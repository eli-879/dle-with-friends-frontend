import BoardSquare from '../board-square/board-square';
import styles from './board-row.module.css';
export default function BoardRow() {
    const squares = [0, 1, 2, 3, 4];
    return (
        <>
            <div className={styles.boardRow}>
                {squares.map((square, index) => {
                    return <BoardSquare key={index}></BoardSquare>;
                })}
            </div>
        </>
    );
}
