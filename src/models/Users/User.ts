import uniqid from 'uniqid';

export default class User {
  static users: User[] = [];

  static getUser(name: string): User | null {
    return this.users.find((user) => user.name === name) ?? null;
  }

  id: string;
  name: string;

  constructor(name: string, id?: string) {
    this.name = name;

    this.id = id ?? uniqid('U');
  }
}
