import Room from './models/Room';
import User from './models/Users/User';
import * as SocketServer from './servers/socketServer';
import * as ApiServer from './servers/apiServer';

const WEBSOCKET_PORT = 3000;
const API_PORT = 8080;

// test
const _u = new User('serg');
const _r = new Room(_u);

ApiServer.run(API_PORT);
SocketServer.run(WEBSOCKET_PORT);
