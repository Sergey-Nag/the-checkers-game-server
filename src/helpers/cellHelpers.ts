import Cell from '../models/Game/Cell';
import { ColName } from '../types/CellTypes';
import { Color } from '../types/Color';

const COL_NAMES: ColName[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const getColor = (x: number, y: number) =>
  (x + y) % 2 === 0 ? Color.White : Color.Black;

const getColName = (x: number): ColName => COL_NAMES[x];

const getDiagonalCellsBetween = (from: Cell, to: Cell, cells: Cell[]) => {
  const dx = from.x < to.x ? 1 : -1;
  const dy = from.y < to.y ? 1 : -1;
  const distance = Math.abs(from.x - to.x);

  return [...new Array(distance)]
    .map((_, i) =>
      cells.find((C) => C.x === from.x + dx * i && C.y === from.y + dy * i)
    )
    .slice(1) as Cell[];
};

export { getColor, getColName, getDiagonalCellsBetween };
