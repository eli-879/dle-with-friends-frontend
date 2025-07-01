import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('join-game', 'routes/join-game.tsx'),
    route('lobby/:roomId', 'routes/lobby.tsx'),
    route('game/:gameId', 'routes/game.tsx'),
] satisfies RouteConfig;
