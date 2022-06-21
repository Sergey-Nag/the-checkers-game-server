import { Color } from '../types/Color';
import Player from './Users/Player';
import User from './Users/User';
import uniqid from 'uniqid';
import Watcher from './Users/Watcher';

export default class Room {
  static rooms: Room[] = [];

  static getRoom(id: string): Room | null {
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  static addRoom(room: Room) {
    this.rooms.push(room);
  }

  players: {
    white: Player | null;
    black: Player | null;
  } = {
    white: null,
    black: null
  };
  id: string;
  moveTurn: Color = Color.White;
  watchers: Watcher[] = [];
  board = null;

  constructor(firstPlayer?: User) {
    this.id = uniqid('R');

    if (firstPlayer) this.addUser(firstPlayer);

    Room.addRoom(this);
  }

  addUser(user: User) {
    if (!this.players.white) {
      this.players.white = new Player(user, Color.White);
    } else if (!this.players.black) {
      this.players.black = new Player(user, Color.Black);
    } else {
      this.watchers.push(new Watcher(user));
    }
  }
}
