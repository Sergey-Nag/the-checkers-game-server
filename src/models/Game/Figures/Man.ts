import { Color } from '../../../types/Color';
import Cell from '../Cell';

export interface Figure {
  color: Color;
  x: number;
  y: number;
  isKing: boolean;

  canMove(target: Cell, cells: Cell[]): boolean;
  canEat(target: Cell, cells: Cell[]): boolean;
  canMoveToEat(target: Cell, cells: Cell[]): boolean;
}

export default class Man implements Figure {
  isKing = false;
  constructor(public x: number, public y: number, public color: Color) {}

  canMove(target: Cell, cells: Cell[]): boolean {
    if (target.figure || !this.isDiagonal(target)) return false;

    const absX = Math.abs(target.x - this.x);

    if (absX > 1 || target.y >= this.y) return false;

    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absX; i++) {
      const cell = cells.find(
        (c) => c.x === this.x + dx * i && c.y === this.y - i
      );

      if (cell?.figure) return false;
    }

    return true;
  }

  canMoveToEat(cell: Cell, cells: Cell[]) {
    if (cell.figure || !this.isDiagonal(cell)) return false;

    const { dx, dy } = this.getDirection(cell);

    const target = cells.find(
      (t) => t.x === cell.x - dx * 1 && t.y === cell.y - dy * 1
    );

    console.log(this, target, cell);

    if (!target) return false;

    return this.canEat(target, cells);
  }

  canEat(target: Cell, cells: Cell[]): boolean {
    if (!this.isDiagonal(target)) return false;

    if (Math.abs(target.x - this.x) !== 1) return false;

    const { dx, dy } = this.getDirection(target);

    const nextCell = cells.find(
      (cell) => cell.x === target.x + dx * 1 && cell.y === target.y + dy * 1
    );

    if (nextCell?.figure) return false;

    return !!target.figure && target.figure.color !== this.color;
  }

  private isDiagonal(cell: Cell) {
    return Math.abs(cell.x - this.x) === Math.abs(cell.y - this.y);
  }

  private getDirection(cell: Cell): { dx: 1 | -1; dy: 1 | -1 } {
    return {
      dx: this.x < cell.x ? 1 : -1,
      dy: this.y < cell.y ? 1 : -1
    };
  }
}
