import { Button, Stack } from '@mui/material';

interface ChildProps {
    disableButtons: boolean;
    onCreateRoom: () => void;
    onJoinRoom: () => void;
}

export default function GameButtons({
    disableButtons,
    onCreateRoom,
    onJoinRoom,
}: ChildProps) {
    return (
        <Stack spacing={2}>
            <Button
                disabled={disableButtons}
                variant="contained"
                onClick={onCreateRoom}
            >
                Create Game
            </Button>
            <Button
                disabled={disableButtons}
                variant="contained"
                onClick={onJoinRoom}
            >
                Join Game
            </Button>
        </Stack>
    );
}
