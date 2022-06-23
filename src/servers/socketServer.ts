import { WebSocketServer } from 'ws';
import GameController from '../controllers/GameController';
import {
  errorPayload,
  getRoomQueryParams,
  payload,
  requestHandler
} from '../helpers/serversHelpers';
import King from '../models/Game/Figures/King';
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
      const game = new GameController(req.url as string);
      // const { roomId, userName } =
      const { user, room } = game;

      ws.gameData = { roomId: room.id, userId: user.id };
      const participantRole = room.addParticipant(user);

      ws.send(payload(ResponsePayloadType.participantRole, participantRole));
      ws.send(payload(ResponsePayloadType.board, room.board.cells));

      ws.on('message', (data) => {
        try {
          const { type, message }: RequestPayload = JSON.parse(data.toString());

          switch (type) {
            case RequestPayloadType.highlight: {
              const { col, row } = message.from;
              const availableCells = game.getAvailableMovesFromCell(col, row);
              ws.send(payload(ResponsePayloadType.highlight, availableCells));
              break;
            }
            case RequestPayloadType.move: {
              const { from, to } = message;

              const success = game.moveFigures(from, to);

              if (success)
                ws.send(payload(ResponsePayloadType.board, room.board.cells));
              break;
            }
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
