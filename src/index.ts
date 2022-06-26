import Room from './models/Room';
import User from './models/Users/User';
import * as SocketServer from './servers/socketServer';
import * as ApiServer from './servers/apiServer';

const WEBSOCKET_PORT = 4000;
const API_PORT = 8080;

// test
new User('serg');
new Room();

ApiServer.run(API_PORT);
SocketServer.run(WEBSOCKET_PORT);
