import uniqid from 'uniqid';

export default class User {
  static users: User[] = [];

  static get(name: string, id?: string): User | null {
    return (
      this.users.find(
        (user) => user.name === name && (id ? user.id === id : true)
      ) ?? null
    );
  }

  static getOrCreate(name: string): User {
    const user = this.get(name);

    return user ?? new User(name);
  }

  static add(user: User) {
    if (this.get(user.name, user.id)) return;

    this.users.push(user);
  }

  id: string;
  name: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? uniqid('U');

    User.add(this);
  }
}
