import type GameState from './gameState';

export default interface PlayerDtoIn {
    id: string;
    name: string;
    gameState: GameState;
}
