import { Stack, Button } from '@mui/material';

interface ChildProps {
	onCreateRoom: () => void;
	onJoinRoom: () => void;
}

export default function GameButtons({ onCreateRoom, onJoinRoom }: ChildProps) {
	return (
		<Stack spacing={2}>
			<Button variant='contained' onClick={onCreateRoom}>
				Create Game
			</Button>
			<Button variant='contained' onClick={onJoinRoom}>
				Join Game
			</Button>
		</Stack>
	);
}
