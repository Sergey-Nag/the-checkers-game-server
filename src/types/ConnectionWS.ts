import { WebSocket } from 'ws';

type ConnectionWS = WebSocket & { id: string };

export { ConnectionWS };
