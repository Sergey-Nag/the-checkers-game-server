import { Color } from '../../../types/Color';
import Cell from '../Cell';
import Man from './Man';

export default class King extends Man {
  isKing = true;
  constructor(x: number, y: number, color: Color) {
    super(x, y, color);
  }

  canMoveToEat(target: Cell, cells: Cell[]) {
    if (target.figure || !this.isDiagonal(target)) return false;

    const diagonalCells = this.getDiagonalCellsBetween(target, cells);

    if (
      diagonalCells.some(({ figure }) => figure && figure?.color === this.color)
    )
      return false;

    if (
      diagonalCells.filter(
        ({ figure }) => figure && figure.color !== this.color
      ).length === 1
    )
      return true;

    return false;
  }

  canMove(target: Cell, cells: Cell[]): boolean {
    if (target.figure || !this.isDiagonal(target)) return false;

    const diagonalCells = this.getDiagonalCellsBetween(target, cells);

    if (diagonalCells.some((cell) => cell.figure)) return false;

    return true;
  }

  canEat(target: Cell, cells: Cell[]): boolean {
    if (
      !this.isDiagonal(target) ||
      !target.figure ||
      target.figure.color === this.color
    )
      return false;

    const { dx, dy } = this.getDirection(target);
    const [afterTargetCell, beforeTargetCell] = cells.filter(
      ({ x, y }) =>
        (x === target.x + dx * 1 && y === target.y + dy * 1) ||
        (x === target.x - dx * 1 && y === target.y - dy * 1)
    );

    if (
      !afterTargetCell ||
      !beforeTargetCell ||
      (beforeTargetCell.figure && beforeTargetCell.figure !== this) ||
      (afterTargetCell.figure && afterTargetCell.figure !== this)
    )
      return false;

    const cellsBetween = this.getDiagonalCellsBetween(target, cells);

    if (cellsBetween.filter((cell) => cell.figure).length) return false;

    return true;
  }

  getDiagonalCellsBetween(target: Cell, cells: Cell[]) {
    const { dx, dy } = this.getDirection(target);
    const distance = Math.abs(this.x - target.x);

    return [...new Array(distance)]
      .map((_, i) =>
        cells.find((C) => C.x === this.x + dx * i && C.y === this.y + dy * i)
      )
      .slice(1) as Cell[];
  }

  protected isNoFiguresOnTheWay(
    absX: number,
    cells: Cell[],
    dx: number,
    dy: number
  ): boolean {
    let findedCell: Cell | null = null;

    for (let i = 1; i < absX; i++) {
      const cell = cells.find(
        (c) => c.x === this.x + dx * i && c.y === this.y + dy * i
      );

      if (findedCell && cell && cell.figure) return false;

      findedCell =
        cell && cell.figure && cell.figure.color !== this.color
          ? cell
          : findedCell;
    }

    return true;
  }

  protected isCorrectDirection(_target: Cell): boolean {
    return true;
  }

  protected isAvailableDistance(_absX: number): boolean {
    return true;
  }
}
