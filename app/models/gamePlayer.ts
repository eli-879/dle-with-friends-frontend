import type GameState from './gameState';

export default interface GamePlayer {
    id: string;
    name: string;
    gameState: GameState;
}
