import { EventEmitter } from 'events';
import { getRoomQueryParams } from '../helpers/serversHelpers';
import Room from '../models/Room';
import Player from '../models/Users/Player';
import User from '../models/Users/User';
import Watcher from '../models/Users/Watcher';
import { CellAnswer } from '../types/CellTypes';
import { Color } from '../types/Color';
import { GameStatus } from '../types/GameTypes';
import { RoomQueryParams, WSGame } from '../types/RoomTypes';
import { ResponsePayloadType } from '../types/WSPayload';

export default class GameController {
  private params: RoomQueryParams;
  events: EventEmitter;
  user!: Player | Watcher;
  room!: Room;

  get isPlaying() {
    return (
      !this.room.results?.winner && this.room.playersArr.every((pl) => !!pl)
    );
  }

  get isGameOver() {
    if (!this.room) return false;

    if (
      Object.values(this.room.board.eatenFigures).some(
        (figures) => figures.length === 12
      )
    )
      return true;

    if (!this.room.board.hasMoves(this.room.board.moveTurn)) return true;

    return !!this.room.results;
  }

  constructor(private url: string) {
    this.params = getRoomQueryParams(url);
    this.events = new EventEmitter();

    if (!this.isParamsValid(this.params)) throw 'Params is invalid';
  }

  init(ws: WSGame): EventEmitter {
    const { userName, roomId } = this.params;
    const user = User.getOrCreate(userName);
    const room = Room.get(roomId);

    if (!room) throw 'Room not found';

    this.room = room;

    ws.gameData = {
      roomId: this.params.roomId,
      userId: user.id
    };

    setTimeout(() => {
      this.addParticipantToRoom(user);
      this.sendBoard();
      this.sendGameStatus(false);

      this.events.emit(
        ResponsePayloadType.TO_ALL_IN_ROOM,
        ResponsePayloadType.eat
      );

      if (this.isPlaying) {
        this.events.emit(
          ResponsePayloadType.TO_ALL_IN_ROOM,
          ResponsePayloadType.moveTurn
        );
      }
    }, 0);

    return this.events;
  }

  getGameStatus(): GameStatus {
    if (this.isGameOver) return GameStatus.GameOver;

    if (this.isPlaying) return GameStatus.Play;

    return GameStatus.GameNotStarted;
  }

  getMoveTurn() {
    return this.room.board.moveTurn;
  }

  getGameResult() {
    return this.room.results;
  }

  gameOver(sendToAll = true) {
    this.setGameResults();

    this.sendGameStatus(sendToAll);
    if (sendToAll) {
      this.events.emit(
        ResponsePayloadType.TO_ALL_IN_ROOM,
        ResponsePayloadType.gameOver
      );
    } else {
      this.events.emit(ResponsePayloadType.gameOver);
    }
    console.log('GAMEOVER to all?', sendToAll);
  }

  end() {
    if (!this.room) return;

    this.room.removeParticipant(this.user);

    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM_EXCEPT_CURRENT,
      ResponsePayloadType.participant
    );
  }

  sendBoard() {
    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM,
      ResponsePayloadType.board
    );
  }

  sendGameStatus(toAll: boolean) {
    if (toAll) {
      this.events.emit(
        ResponsePayloadType.TO_ALL_IN_ROOM,
        ResponsePayloadType.gameStatus
      );

      return;
    }

    this.events.emit(ResponsePayloadType.gameStatus);
  }

  addParticipantToRoom(user: User) {
    const [participant, role] = this.room.addParticipant(user);

    this.user = participant;

    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM,
      ResponsePayloadType.participant
    );
  }

  moveFigures(from: { id: string }, to: { id: string }) {
    if (this.user instanceof Watcher) return;

    const fromCell = this.room.board.getCell(from.id);
    const toCell = this.room.board.getCell(to.id);

    if (!fromCell || !toCell) throw "Cells didn't find";

    if (
      this.user.color !== this.room.board.moveTurn ||
      (fromCell.figure && fromCell?.figure.color !== this.user.color)
    )
      throw 'Wrong turn';

    const movesToEat = this.room.board.getCellsHaveToEat();

    if (movesToEat.length && movesToEat.every((c) => c !== fromCell)) {
      this.events.emit(ResponsePayloadType.moveTurn);
      throw 'Have to eat';
    }

    const result = this.room.board.moveFigure(fromCell, toCell);

    if (!result) return false;

    this.sendBoard();

    if (result === 'eat')
      this.events.emit(
        ResponsePayloadType.TO_ALL_IN_ROOM,
        ResponsePayloadType.eat
      );

    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM,
      ResponsePayloadType.moveTurn
    );
  }

  getAvailableMovesFromCell(id: string) {
    if (this.user instanceof Watcher) return;

    const cell = this.room.board.getCell(id);

    if (!cell) throw 'Cell not found';

    if (!cell.figure || cell.color === Color.White) return [];

    const availableCells = [
      ...this.room.board
        .getAvailableMoves(cell)
        .map((cell) => ({ ...cell, canEat: false } as CellAnswer)),
      ...this.room.board
        .getAvailableEats(cell)
        .map((cell) => ({ ...cell, canEat: true } as CellAnswer))
    ];

    this.events.emit(ResponsePayloadType.highlight, availableCells);
  }

  getBoard(userId: string) {
    const player = this.room.playersArr.find((pl) => pl && pl.id === userId);

    return this.room.board.getCells(player?.color);
  }

  getParticipants() {
    const { players, watchers } = this.room;

    return { players, watchers };
  }

  private isParamsValid(params: RoomQueryParams): boolean {
    return (
      'roomId' in params &&
      'userName' in params &&
      !!params.roomId &&
      !!params.userName
    );
  }

  private setGameResults() {
    const { eatenFigures } = this.room.board;
    let winner: Player;
    let loser: Player;

    if (
      this.room.results ||
      !this.room.players.black ||
      !this.room.players.white
    )
      return;

    if (
      eatenFigures.white.length < eatenFigures.black.length ||
      !this.room.board.hasMoves(Color.Black)
    ) {
      winner = this.room.players.white;
      loser = this.room.players.black;
    } else {
      winner = this.room.players.black;
      loser = this.room.players.white;
    }

    this.room.results = {
      winner,
      loser,
      winnerColor: winner.color,
      score: {
        black: this.room.board.eatenFigures.white.length,
        white: this.room.board.eatenFigures.black.length
      }
    };
  }
}
