import { WebSocketServer } from 'ws';
import { getRoomQueryParams } from '../helpers/getQueryParams';
import Room from '../models/Room';
import User from '../models/Users/User';

const run = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws, req) => {
    try {
      const { roomId, userName } = getRoomQueryParams(req.url as string);
      const user = User.getUser(userName);
      const room = Room.getRoom(roomId);

      if (!room) throw 'Room not found';

      console.log(roomId, userName);
    } catch (e) {
      console.log(e);
    }
  });

  console.log(`Socket server launched on port: ${port}`);
};

export { run };
