import { Color } from '../../../types/Color';
import Cell from '../Cell';

export interface Figure {
  color: Color;
  x: number;
  y: number;
  isKing: boolean;

  canMove(cell: Cell): boolean;
  canEat(cell: Cell): boolean;
}

export default class Man implements Figure {
  isKing = false;
  constructor(public x: number, public y: number, public color: Color) {}

  canMove(cell: Cell): boolean {
    const absX = Math.abs(cell.x - this.x);
    const absY = Math.abs(cell.y - this.y);

    if (absX !== absY) return false;

    return true;
  }

  canEat(cell: Cell): boolean {
    throw new Error('Method not implemented.');
  }
}
