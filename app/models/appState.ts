import type { HubConnection } from '@microsoft/signalr';

export default interface AppState {
    connection: HubConnection;
    nickname: string;
    setNickname?: (newNickname: string) => void;
}
