import User from './User';

export default class Watcher extends User {
  constructor(user: User) {
    super(user.name, user.id);
  }
}
