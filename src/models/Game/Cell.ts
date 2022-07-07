import uniqid from 'uniqid';
import { getColName, getColor } from '../../helpers/cellHelpers';
import { ColName } from '../../types/CellTypes';
import { Color } from '../../types/Color';
import King from './Figures/King';
import Man, { Figure } from './Figures/Man';

export default class Cell {
  color: Color;
  col: ColName;
  row: number;
  figure: Figure | null = null;

  constructor(
    public x: number,
    public y: number,
    public id = uniqid.process()
  ) {
    this.color = getColor(x, y);
    this.col = getColName(x);
    this.row = y + 1;
  }

  setFigure({
    color,
    isKing,
    id
  }: {
    color: Color;
    isKing?: boolean;
    id?: string;
  }) {
    this.figure = isKing
      ? new King(this.x, this.y, color, id)
      : new Man(this.x, this.y, color, id);
  }
}
