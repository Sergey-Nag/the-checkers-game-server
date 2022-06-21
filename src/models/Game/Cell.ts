import { getColName, getColor } from '../../helpers/cellHelpers';
import { ColName } from '../../types/CellTypes';
import { Color } from '../../types/Color';
import Man, { Figure } from './Figures/Man';

export default class Cell {
  color: Color;
  col: ColName;
  row: number;
  figure: Figure | null = null;

  constructor(public x: number, public y: number) {
    this.color = getColor(x, y);
    this.col = getColName(x);
    this.row = y + 1;
  }

  setFigure(color: Color) {
    this.figure = new Man(this.x, this.y, color);
  }
}
