import { CellSearchParams } from '../../types/CellTypes';
import { Color } from '../../types/Color';
import Cell from './Cell';
import { Figure } from './Figures/Man';

export default class Board {
  private _cells: Cell[] = [];

  get cells() {
    return this._cells;
  }

  constructor() {
    this.setupCells();

    this.placeFigure(2, 3, Color.Black);
    this.placeFigure(5, 6, Color.White);
  }

  getCell(params: CellSearchParams): Cell | null {
    if ('x' in params)
      return (
        this._cells.find(
          (cell) => cell.x === params.x && cell.y === params.y
        ) ?? null
      );

    if ('col' in params)
      return (
        this._cells.find(
          (cell) => cell.col === params.col && cell.row === params.row
        ) ?? null
      );

    return null;
  }

  moveFigure(from: Cell, to: Cell) {
    if (!from.figure || to.figure) return false;

    if (
      !from.figure.canMoveToEat(to, this.cells) &&
      !from.figure.canMove(to, this._cells)
    )
      return false;

    to.setFigure(from.figure);
    from.figure = null;

    return true;
  }

  getAvailableMoves({ figure }: Cell): Cell[] {
    if (!figure) return [];

    const availableCellsToEat = this._cells.filter((C) =>
      (figure as Figure).canMoveToEat(C, this._cells)
    );

    if (availableCellsToEat.length) return availableCellsToEat;

    const availableCells = this._cells.filter((C) =>
      (figure as Figure).canMove(C, this._cells)
    );

    return availableCells;
  }

  getAvailableEatMoves({ figure }: Cell): Cell[] {
    if (!figure) return [];

    const availableCells = this._cells.filter((C) =>
      (figure as Figure).canMoveToEat(C, this._cells)
    );

    return availableCells;
  }

  private setupCells() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this._cells.push(new Cell(x, y));
      }
    }
  }

  private placeFigure(from: number, to: number, color: Color) {
    for (let y = from; y < to; y++) {
      for (let x = 0; x < 8; x++) {
        const cell = this.getCell({ x, y });

        if (cell && cell.color === Color.Black) cell.setFigure({ color });
      }
    }
  }
}
