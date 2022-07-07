import uniqid from 'uniqid';

export default class User {
  static users: User[] = [];

  static get(nameOrId: string): User | null {
    return (
      this.users.find(
        (user) => user.name === nameOrId || user.id === nameOrId
      ) ?? null
    );
  }

  static getOrCreate(name: string, id?: string): User {
    const user = this.get(name);

    return user ?? new User(name, id);
  }

  static add(user: User) {
    if (this.get(user.id)) return;

    this.users.push(user);
  }

  id: string;
  name: string;
  avatar_url?: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? uniqid('U');

    User.add(this);
  }
}
