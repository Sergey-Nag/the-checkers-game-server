// enum CellCol {
//   '0' = 'a'
// }

import Cell from '../models/Game/Cell';

type ColName = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

type CellSearchParams =
  | {
      x: number;
      y: number;
    }
  | {
      col: ColName;
      row: number;
    };

interface CellAnswer extends Cell {
  canEat: boolean;
}

export { ColName, CellSearchParams, CellAnswer };
