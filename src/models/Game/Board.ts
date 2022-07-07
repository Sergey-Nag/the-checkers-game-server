import { getDiagonalCellsBetween } from '../../helpers/cellHelpers';
import { Color } from '../../types/Color';
import Cell from './Cell';
import { Figure } from './Figures/Man';

export default class Board {
  cells: Cell[] = [];

  eatenFigures: {
    white: Figure[];
    black: Figure[];
  } = {
    white: [],
    black: []
  };

  moveTurn: Color = Color.White;

  constructor() {
    this.setupCells();

    this.placeFigure(0, 3, Color.Black);
    this.placeFigure(5, 8, Color.White);
  }

  getCells(userColor?: Color) {
    return userColor && userColor === Color.Black
      ? this.getFlippedCells()
      : this.cells;
  }

  getCell(id: string): Cell | null {
    return this.cells.find((cell) => cell.id === id) ?? null;
  }

  hasMoves(figuresColor: Color): boolean {
    return this.cells
      .filter((cell) => cell.figure && cell.figure.color === figuresColor)
      .some((cell) => cell.figure?.hasMoves(this.cells));
  }

  moveFigure(from: Cell, to: Cell): 'move' | 'eat' | false {
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

  getCellsHaveToEat(figureColor: Color = this.moveTurn) {
    return this.cells
      .filter((c) => c.figure && c.figure.color === figureColor)
      .filter((c) => c.figure?.hasEats(this.cells));
  }

  private doMove(from: Cell, to: Cell): 'move' | 'eat' | false {
    if (!from.figure || to.figure) return false;

    const forEat = this.findEatenCell(from, to);

    if (
      (from.figure.color === Color.White && to.row === 1) ||
      (from.figure.color === Color.Black && to.row === 8)
    ) {
      to.setFigure({
        color: from.figure.color,
        isKing: true,
        id: from.figure.id
      });
    } else {
      to.setFigure(from.figure);
    }

    const isEaten = forEat && this.eatFigure(forEat);
    from.figure = null;

    let result: 'move' | 'eat' = 'move';

    if (isEaten) {
      result = 'eat';

      if ((to.figure as unknown as Figure).hasEats(this.cells)) return result;
    }

    this.swapTurn();

    return result;
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

    const availableCellsToEat = this.cells.filter((C) =>
      (figure as Figure).canMoveToEat(C, this.cells)
    );

    if (availableCellsToEat.length) return availableCellsToEat;

    const availableCells = this.cells.filter((C) =>
      (figure as Figure).canMove(C, this.cells)
    );

    return availableCells;
  }

  getAvailableEats({ figure }: Cell): Cell[] {
    if (!figure) return [];

    const availableCells = this.cells.filter((C) =>
      (figure as Figure).canEat(C, this.cells)
    );

    return availableCells;
  }

  findEatenCell(from: Cell, to: Cell) {
    const cells = getDiagonalCellsBetween(from, to, this.cells);

    return cells.find((cell) => from.figure?.canEat(cell, this.cells)) ?? null;
  }

  private getFlippedCells() {
    return [...this.cells].reverse();
  }

  private setupCells() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.cells.push(new Cell(x, y));
      }
    }
  }

  private placeFigure(from: number, to: number, color: Color) {
    for (let y = from; y < to; y++) {
      for (let x = 0; x < 8; x++) {
        const cell = this.cells.find((cell) => cell.x === x && cell.y === y);

        if (cell && cell.color === Color.Black) cell.setFigure({ color });
      }
    }
  }
}
