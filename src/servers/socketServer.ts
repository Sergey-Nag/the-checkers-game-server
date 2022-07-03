import { Server } from 'ws';
import GameController from '../controllers/GameController';
import { errorPayload, payload } from '../helpers/serversHelpers';
import { CellAnswer } from '../types/CellTypes';
import { ParticipantRole, WSGame } from '../types/RoomTypes';
import { createServer } from 'http';
import {
  RequestPayload,
  RequestPayloadType,
  ResponsePayloadType
} from '../types/WSPayload';

const server = createServer();

const wss = new Server<WSGame>({ server: server });

wss.on('connection', (ws: WSGame, req) => {
  try {
    const game = new GameController(req.url as string);

    ws.on('message', (data) => {
      try {
        if (game.isGameOver) throw 'Game over';
        if (!game.isPlaying) throw 'Game is not started';

        const { type, message }: RequestPayload = JSON.parse(data.toString());

        switch (type) {
          case RequestPayloadType.highlight: {
            const { col, row } = message.from;
            game.getAvailableMovesFromCell(col, row);
            break;
          }
          case RequestPayloadType.move: {
            const { from, to } = message;
            game.moveFigures(from, to);
            break;
          }
          default:
            console.log('default payload', type, message);
        }

        if (game.isGameOver) game.gameOver();
      } catch (e) {
        console.log(e);

        if (typeof e === 'string') ws.send(errorPayload(e));
        else ws.send(errorPayload('Invalid payload'));
      }
    });

    ws.on('close', () => {
      game.end();
    });

    game
      .init(ws)
      .on(ResponsePayloadType.highlight, (cells: CellAnswer) => {
        ws.send(payload(ResponsePayloadType.highlight, cells));
      })
      .on(ResponsePayloadType.participantRole, (role: ParticipantRole) => {
        ws.send(payload(ResponsePayloadType.participantRole, role));
      })
      .on(ResponsePayloadType.TO_ALL_IN_ROOM, (type: ResponsePayloadType) => {
        wss.clients.forEach((client) => {
          if (client.gameData.roomId !== game.room.id) return;

          let payloadData: string | null;

          switch (type) {
            case ResponsePayloadType.board:
              payloadData = payload(
                ResponsePayloadType.board,
                game.getBoard(client.gameData.userId)
              );
              break;
            case ResponsePayloadType.eat:
              payloadData = payload(
                ResponsePayloadType.eat,
                game.room.board.eatenFigures
              );
              break;
            case ResponsePayloadType.gameOver:
              payloadData = payload(ResponsePayloadType.gameOver, game.winner);
              break;
            default:
              payloadData = null;
          }

          if (payloadData) client.send(payloadData);
        });
      })
      .on(
        ResponsePayloadType.TO_ALL_IN_ROOM_EXCEPT_CURRENT,
        (type: ResponsePayloadType) => {
          wss.clients.forEach((client) => {
            if (
              client.gameData.roomId !== game.room.id ||
              client.gameData.userId === game.user.id
            )
              return;

            let payloadData: string | null;

            switch (type) {
              case ResponsePayloadType.participantIn:
                payloadData = payload(
                  ResponsePayloadType.participantIn,
                  game.user
                );
                break;
              case ResponsePayloadType.participantOut:
                payloadData = payload(
                  ResponsePayloadType.participantOut,
                  game.user
                );
                break;
              default:
                payloadData = null;
            }

            if (payloadData) client.send(payloadData);
          });
        }
      );
  } catch (e) {
    console.log(e);
    if (typeof e === 'string') ws.send(errorPayload(e));
  }
});

export { server };
