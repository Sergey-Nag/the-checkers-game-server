import { Color } from '../types/Color';
import Player from './Users/Player';
import User from './Users/User';
import uniqid from 'uniqid';
import Watcher from './Users/Watcher';
import { ParticipantRole } from '../types/RoomTypes';
import Board from './Game/Board';

export default class Room {
  static rooms: Room[] = [];

  static get(id: string): Room | null {
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  static add(room: Room) {
    if (this.get(room.id)) return;

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
  board: Board;

  get playersArr() {
    return Object.values(this.players);
  }

  constructor() {
    this.id = uniqid('R');
    this.board = new Board();

    Room.add(this);
  }

  addParticipant(user: User): ParticipantRole {
    const U = this.findUser(user);

    if (U && U instanceof Player) return U.color as unknown as ParticipantRole;
    else if (U && U instanceof Watcher) return ParticipantRole.Watcher;

    if (!this.players.white) {
      this.players.white = new Player(user, Color.White);

      return ParticipantRole.White;
    }

    if (!this.players.black) {
      this.players.black = new Player(user, Color.Black);

      return ParticipantRole.Black;
    }

    this.watchers.push(new Watcher(user));

    return ParticipantRole.Black;
  }

  private findUser(user: User) {
    return (
      [...this.watchers, ...this.playersArr].find(
        (u) => u && u.id === user.id
      ) ?? null
    );
  }
}
