import { getDiagonalCellsBetween } from '../../helpers/cellHelpers';
import { CellSearchParams } from '../../types/CellTypes';
import { Color } from '../../types/Color';
import Cell from './Cell';
import { Figure } from './Figures/Man';

export default class Board {
  private _cells: Cell[] = [];

  eatenFigures: {
    white: Figure[];
    black: Figure[];
  } = {
    white: [],
    black: []
  };

  moveTurn: Color = Color.White;

  get cells() {
    return this._cells;
  }

  constructor() {
    this.setupCells();

    this.placeFigure(1, 3, Color.Black);
    this.placeFigure(5, 6, Color.White);

    (this.getCell({ col: 'g', row: 2 }) as Cell).figure = null;
    this.getCell({ col: 'h', row: 1 })?.setFigure({ color: Color.Black });

    this.cells
      .filter((cell) => cell.figure && cell.figure.color === Color.White)
      .forEach((cell) => cell.setFigure({ color: Color.White, isKing: true }));
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
    if (
      from.color === Color.White ||
      !from.figure ||
      to.color === Color.White ||
      to.figure ||
      from.figure.color !== this.moveTurn
    )
      return false;

    if (
      (from.figure.hasEats(this.cells) &&
        !from.figure.canMoveToEat(to, this.cells)) ||
      (from.figure.hasMoves(this.cells) && !from.figure.canMove(to, this.cells))
    )
      return false;

    return this.doMove(from, to);
  }

  private doMove(from: Cell, to: Cell) {
    if (!from.figure || to.figure) return false;

    const forEat = this.findEatenCell(from, to);

    if (
      (from.figure.color === Color.White && to.row === 1) ||
      (from.figure.color === Color.Black && to.row === 8)
    ) {
      to.setFigure({ color: from.figure.color, isKing: true });
    } else {
      to.setFigure(from.figure);
    }

    const isEaten = forEat && this.eatFigure(forEat);
    from.figure = null;

    if (isEaten) {
      // send eaten figures

      if ((to.figure as unknown as Figure).hasEats(this.cells)) return true;
    }

    this.swapTurn();

    return true;
  }

  swapTurn() {
    this.moveTurn = this.moveTurn === Color.White ? Color.Black : Color.White;
  }

  eatFigure(target: Cell): boolean {
    if (!target.figure) return false;

    this.eatenFigures[target.figure.color].push(target.figure);

    target.figure = null;

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

  getAvailableEats({ figure }: Cell): Cell[] {
    if (!figure) return [];

    const availableCells = this._cells.filter((C) =>
      (figure as Figure).canEat(C, this._cells)
    );

    return availableCells;
  }

  findEatenCell(from: Cell, to: Cell) {
    const cells = getDiagonalCellsBetween(from, to, this.cells);

    return cells.find((cell) => from.figure?.canEat(cell, this.cells)) ?? null;
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
