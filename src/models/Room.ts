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

  addParticipant(user: User): [Player | Watcher, ParticipantRole] {
    const U = this.findUser(user);

    if (U && U instanceof Player)
      return [U, U.color as unknown as ParticipantRole];
    else if (U && U instanceof Watcher) return [U, ParticipantRole.Watcher];

    if (!this.players.white) {
      this.players.white = new Player(user, Color.White);

      return [this.players.white, ParticipantRole.White];
    }

    if (!this.players.black) {
      this.players.black = new Player(user, Color.Black);

      return [this.players.black, ParticipantRole.Black];
    }

    const newWatcher = new Watcher(user);
    this.watchers.push(newWatcher);

    return [newWatcher, ParticipantRole.Black];
  }

  removeParticipant(user: User) {
    const U = this.findUser(user);

    if (!U) return;

    if (U instanceof Player) {
      this.players[U.color] = null;

      return;
    }

    const userIndex = this.watchers.findIndex((watcher) => watcher.id === U.id);

    if (userIndex !== -1) this.watchers.splice(userIndex, 1);
  }

  private findUser(user: User) {
    return (
      [...this.watchers, ...this.playersArr].find(
        (u) => u && u.id === user.id
      ) ?? null
    );
  }
}
