// enum CellCol {
//   '0' = 'a'
// }

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

export { ColName, CellSearchParams };
