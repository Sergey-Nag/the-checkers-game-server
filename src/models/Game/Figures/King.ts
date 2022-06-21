import { Color } from '../../../types/Color';
import Man from './Man';

export default class King extends Man {
  isKing = true;
  constructor(x: number, y: number, color: Color) {
    super(x, y, color);
  }
}
