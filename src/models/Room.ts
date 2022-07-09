import { Color } from '../types/Color';
import Player from './Users/Player';
import User from './Users/User';
import uniqid from 'uniqid';
import Watcher from './Users/Watcher';
import { ParticipantRole } from '../types/RoomTypes';
import Board from './Game/Board';
import { HOURS } from '../types/Time';

export default class Room {
  static rooms: Room[] = [];

  static get(id: string): Room | null {
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  static add(room: Room) {
    if (this.get(room.id)) return;

    this.rooms.push(room);
  }

  static remove(roomId: string): boolean {
    const room = this.get(roomId);

    if (!room) return false;

    const roomI = this.rooms.findIndex(({ id }) => id === roomId);
    this.rooms.splice(roomI, 1);

    return true;
  }

  players: {
    white: Player | null;
    black: Player | null;
  } = {
    white: null,
    black: null
  };
  id: string;
  watchers: Watcher[] = [];
  board: Board;
  results: {
    winnerColor: Color;
    winner: Player;
    loser: Player;
    score: {
      black: number;
      white: number;
    };
  } | null = null;

  private lastTimeParticipantsChanged = 0;

  get isAlive(): boolean {
    return (
      (this.playersArr.every((p) => !!p) && !this.results) ||
      this.lastTimeParticipantsChanged + HOURS[2] > Date.now()
    );
  }

  get playersArr() {
    return Object.values(this.players);
  }

  constructor() {
    this.id = uniqid('R');
    this.board = new Board();
    this.lastTimeParticipantsChanged = Date.now();

    Room.add(this);
  }

  addParticipant(user: User): [Player | Watcher, ParticipantRole] {
    const U = this.findUser(user);
    this.lastTimeParticipantsChanged = Date.now();

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

    return [newWatcher, ParticipantRole.Watcher];
  }

  removeParticipant(user: User) {
    const U = this.findUser(user);

    if (!U) return;

    this.lastTimeParticipantsChanged = Date.now();

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
        (u) => u && u.id === user?.id
      ) ?? null
    );
  }
}
