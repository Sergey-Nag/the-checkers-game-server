import { Color } from '../../types/Color';
import User from './User';

export default class Player extends User {
  color: Color;

  constructor(user: User, color: Color) {
    super(user.name, user.id);

    this.color = color;
  }
}
