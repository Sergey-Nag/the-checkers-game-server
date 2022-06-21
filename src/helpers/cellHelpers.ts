import { ColName } from '../types/CellTypes';
import { Color } from '../types/Color';

const COL_NAMES: ColName[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const getColor = (x: number, y: number) =>
  (x + y) % 2 === 0 ? Color.White : Color.Black;

const getColName = (x: number): ColName => COL_NAMES[x];

export { getColor, getColName };
