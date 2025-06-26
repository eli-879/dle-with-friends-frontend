import { HubConnection } from '@microsoft/signalr';
import { createContext, useContext } from 'react';

export const HubConnectionContext = createContext<HubConnection | null>(null);

export const useHubConnection = () => {
	const context = useContext(HubConnectionContext);
	if (!context) throw new Error('HubConnection not available');
	return context;
};
