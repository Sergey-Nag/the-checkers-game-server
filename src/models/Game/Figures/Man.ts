import { Color } from '../../../types/Color';
import Cell from '../Cell';

export interface Figure {
  color: Color;
  x: number;
  y: number;
  isKing: boolean;

  canMove(cell: Cell, cells: Cell[]): boolean;
  canEat(cell: Cell): boolean;
}

export default class Man implements Figure {
  isKing = false;
  constructor(public x: number, public y: number, public color: Color) {}

  canMove(target: Cell, cells: Cell[]): boolean {
    if (target.figure) return false;

    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) return false;

    if (target.y >= this.y) return false;

    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absX; i++) {
      const cell = cells.find(
        (c) => c.x === this.x + dx * i && c.y === this.y - i
      );

      if (cell?.figure) return false;
    }

    return true;
  }

  canEat(cell: Cell): boolean {
    throw new Error('Method not implemented.');
  }
}
