import type { GuessFeedback } from './guessFeedbacks';

export default interface GameState {
    guessFeedbacks: GuessFeedback[][];
    guesses: string[];
}
