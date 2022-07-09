import Room from './models/Room';
import { run } from './servers/servers';
import { MINUTES } from './types/Time';

// test
// new User('serg');
// new Room();

// Clear abandoned rooms
setInterval(() => {
  const rooms = [...Room.rooms];

  rooms.forEach((room) => {
    if (room.isAlive) return;

    Room.remove(room.id);
    console.count('Room has been removed');
  });
}, MINUTES[5]);

run();
