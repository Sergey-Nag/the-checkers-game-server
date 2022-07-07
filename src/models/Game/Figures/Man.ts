import uniqid from 'uniqid';
import { Color } from '../../../types/Color';
import Cell from '../Cell';

export interface Figure {
  color: Color;
  isKing: boolean;
  id: string;

  hasEats(cells: Cell[]): boolean;
  hasMoves(cells: Cell[]): boolean;

  canMove(target: Cell, cells: Cell[]): boolean;
  canEat(target: Cell, cells: Cell[]): boolean;
  canMoveToEat(target: Cell, cells: Cell[]): boolean;
}

export default class Man implements Figure {
  isKing = false;

  constructor(
    protected x: number,
    protected y: number,
    public color: Color,
    public id = 'F' + uniqid.process()
  ) {}

  hasEats(cells: Cell[]): boolean {
    return cells.some((cell) => this.canEat(cell, cells));
  }

  hasMoves(cells: Cell[]): boolean {
    return (
      !this.hasEats(cells) && cells.some((cell) => this.canMove(cell, cells))
    );
  }

  canMove(target: Cell, cells: Cell[]): boolean {
    if (target.figure || !this.isDiagonal(target)) return false;

    const absX = Math.abs(target.x - this.x);

    if (!this.isAvailableDistance(absX) || !this.isCorrectDirection(target))
      return false;

    const { dx, dy } = this.getDirection(target);

    if (!this.isNoFiguresOnTheWay(absX, cells, dx, dy)) return false;

    return true;
  }

  canMoveToEat(cell: Cell, cells: Cell[]) {
    if (cell.figure || !this.isDiagonal(cell)) return false;

    const { dx, dy } = this.getDirection(cell);

    const target = cells.find(
      (t) => t.x === cell.x - dx * 1 && t.y === cell.y - dy * 1
    );

    if (!target) return false;

    return this.canEat(target, cells);
  }

  canEat(target: Cell, cells: Cell[]): boolean {
    if (
      !this.isDiagonal(target) ||
      !this.isAvailableDistance(Math.abs(target.x - this.x))
    )
      return false;

    const { dx, dy } = this.getDirection(target);
    const nextFromTargetCell = this.getNextFromTargetCell(
      target,
      cells,
      dx,
      dy
    );

    if (nextFromTargetCell.every((cell) => !!cell.figure)) return false;

    return (
      !!nextFromTargetCell.length &&
      !!target.figure &&
      target.figure.color !== this.color
    );
  }

  protected isNoFiguresOnTheWay(
    absX: number,
    cells: Cell[],
    dx: number,
    dy: number
  ) {
    for (let i = 1; i < absX; i++) {
      const cell = cells.find(
        (c) => c.x === this.x + dx * i && c.y === this.y + dy * i
      );

      if (cell?.figure) return false;
    }

    return true;
  }

  protected getNextFromTargetCell(
    target: Cell,
    cells: Cell[],
    dx: number,
    dy: number
  ): Cell[] {
    return cells.filter(
      (cell) => cell.x === target.x + dx * 1 && cell.y === target.y + dy * 1
    );
  }

  protected isCorrectDirection(target: Cell): boolean {
    return this.color === Color.White ? this.y > target.y : this.y < target.y;
  }

  protected isAvailableDistance(absX: number) {
    return absX === 1;
  }

  protected isDiagonal(cell: Cell) {
    return Math.abs(cell.x - this.x) === Math.abs(cell.y - this.y);
  }

  protected getDirection(cell: Cell): { dx: 1 | -1; dy: 1 | -1 } {
    return {
      dx: this.x < cell.x ? 1 : -1,
      dy: this.y < cell.y ? 1 : -1
    };
  }
}
