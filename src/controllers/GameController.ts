import { EventEmitter } from 'events';
import { getRoomQueryParams } from '../helpers/serversHelpers';
import Room from '../models/Room';
import Player from '../models/Users/Player';
import User from '../models/Users/User';
import Watcher from '../models/Users/Watcher';
import { CellAnswer, ColName } from '../types/CellTypes';
import { Color } from '../types/Color';
import { RoomQueryParams, WSGame } from '../types/RoomTypes';
import { ResponsePayloadType } from '../types/WSPayload';

export default class GameController {
  private params: RoomQueryParams;
  events: EventEmitter;
  user!: Player | Watcher;
  room!: Room;
  winner: Player | null = null;

  get isPlaying() {
    return !this.winner && this.room.playersArr.every((pl) => !!pl);
  }

  get isGameOver() {
    if (
      Object.values(this.room.board.eatenFigures).some(
        (figures) => figures.length === 12
      )
    )
      return true;

    if (!this.room.board.hasMoves(this.room.board.moveTurn)) return true;

    return false;
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
    }, 0);

    return this.events;
  }

  gameOver() {
    console.log('GAME OVER', this.room.board.eatenFigures);

    const { eatenFigures } = this.room.board;
    if (
      eatenFigures.white.length < eatenFigures.black.length ||
      !this.room.board.hasMoves(Color.Black)
    ) {
      this.winner = this.room.players.white;
    } else {
      this.winner = this.room.players.black;
    }

    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM,
      ResponsePayloadType.gameOver
    );
  }

  end() {
    console.log(this.room, this.user);

    this.room.removeParticipant(this.user);

    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM_EXCEPT_CURRENT,
      ResponsePayloadType.participantOut
    );
  }

  sendBoard() {
    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM,
      ResponsePayloadType.board
    );
  }

  addParticipantToRoom(user: User) {
    const [participant, role] = this.room.addParticipant(user);

    this.user = participant;

    this.events.emit(ResponsePayloadType.participantRole, role);
    this.events.emit(
      ResponsePayloadType.TO_ALL_IN_ROOM_EXCEPT_CURRENT,
      ResponsePayloadType.participantIn
    );
  }

  moveFigures(
    from: { col: ColName; row: number },
    to: { col: ColName; row: number }
  ) {
    if (this.user instanceof Watcher) return;

    const fromCell = this.room.board.getCell({
      col: from.col,
      row: from.row
    });
    const toCell = this.room.board.getCell({
      col: to.col,
      row: to.row
    });

    if (!fromCell || !toCell) throw "Cells didn't find";

    if (
      this.user.color !== this.room.board.moveTurn ||
      (fromCell.figure && fromCell?.figure.color !== this.user.color)
    )
      throw 'Wrong turn';

    const movesToEat = this.room.board.getCellsHaveToEat();

    if (movesToEat.length && movesToEat.every((c) => c !== fromCell))
      throw 'Have to eat';

    const result = this.room.board.moveFigure(fromCell, toCell);

    if (!result) return false;

    this.sendBoard();

    if (result === 'eat')
      this.events.emit(
        ResponsePayloadType.TO_ALL_IN_ROOM,
        ResponsePayloadType.eat
      );
  }

  getAvailableMovesFromCell(col: ColName, row: number) {
    if (this.user instanceof Watcher) return;

    const cell = this.room.board.getCell({ col, row });

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

  private isParamsValid(params: RoomQueryParams): boolean {
    return (
      'roomId' in params &&
      'userName' in params &&
      !!params.roomId &&
      !!params.userName
    );
  }
}
