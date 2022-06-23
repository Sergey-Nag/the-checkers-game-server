import { getRoomQueryParams } from '../helpers/serversHelpers';
import Room from '../models/Room';
import User from '../models/Users/User';
import { CellAnswer, ColName } from '../types/CellTypes';
import { RoomQueryParams } from '../types/RoomTypes';

export default class GameController {
  user!: User;
  room!: Room;

  constructor(private url: string) {
    const params = getRoomQueryParams(url);

    if (!this.isParamsValid(params)) throw 'Params is invalid';

    this.init(params);
  }

  init({ userName, roomId }: RoomQueryParams) {
    const user = User.getOrCreate(userName);
    const room = Room.get(roomId);

    if (!room) throw 'Room not found';

    this.user = user;
    this.room = room;
  }

  moveFigures(
    from: { col: ColName; row: number },
    to: { col: ColName; row: number }
  ): boolean {
    const fromCell = this.room.board.getCell({
      col: from.col,
      row: from.row
    });
    const toCell = this.room.board.getCell({
      col: to.col,
      row: to.row
    });

    if (!fromCell || !toCell) throw "Cells didn't find";

    const success = this.room.board.moveFigure(fromCell, toCell);

    return success;
  }

  getAvailableMovesFromCell(col: ColName, row: number): CellAnswer[] {
    const cell = this.room.board.getCell({ col, row });

    if (!cell) throw 'Cell not found';

    const availableCells = [
      ...this.room.board
        .getAvailableMoves(cell)
        .map((cell) => ({ ...cell, canEat: false } as CellAnswer)),
      ...this.room.board
        .getAvailableEats(cell)
        .map((cell) => ({ ...cell, canEat: true } as CellAnswer))
    ];

    return availableCells;
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
