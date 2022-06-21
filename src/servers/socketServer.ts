import { WebSocketServer } from 'ws';
import {
  errorPayload,
  getRoomQueryParams,
  payload,
  requestHandler
} from '../helpers/serversHelpers';
import Room from '../models/Room';
import User from '../models/Users/User';
import { WSConnect } from '../types/RoomTypes';
import {
  RequestPayload,
  RequestPayloadType,
  ResponsePayloadType
} from '../types/WSPayload';

const run = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WSConnect, req) => {
    try {
      const { roomId, userName } = getRoomQueryParams(req.url as string);
      const user = User.getOrCreate(userName);
      const room = Room.get(roomId);

      if (!room) throw 'Room not found';

      ws.gameData = { roomId, userId: user.id };
      const participantRole = room.addParticipant(user);

      ws.send(payload(ResponsePayloadType.participantRole, participantRole));
      ws.send(payload(ResponsePayloadType.board, room.board.cells));

      ws.on('message', (data) => {
        try {
          const { type, message }: RequestPayload = JSON.parse(data.toString());

          switch (type) {
            case RequestPayloadType.highlight: {
              const { col, row } = message.from;
              const cell = room.board.getCell({ col, row });
              console.log(message, cell);

              if (!cell) return;

              const availableCells = room.board.getAvailableMoves(cell);

              ws.send(payload(ResponsePayloadType.highlight, availableCells));
              break;
            }
            case RequestPayloadType.move:
              break;
            default:
              console.log('default payload', type, message);
          }
        } catch (e) {
          ws.send(errorPayload('Invalid payload'));
        }
      });

      console.log(ws.gameData);
    } catch (e) {
      console.log(e);
      if (typeof e === 'string') ws.send(errorPayload(e));
    }
  });

  console.log(`Socket server launched on port: ${port}`);
};

export { run };
