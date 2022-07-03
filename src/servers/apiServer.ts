import express from 'express';
import cors from 'cors';
import Room from '../models/Room';
import { join } from 'path';
import { apiDocRouter } from './apiDocs/apiDocs';
import User from '../models/Users/User';

const app = express();

app.use(cors());
app.use(apiDocRouter);
app.set('views', join(__dirname, '../../', 'public'));
app.set('view engine', 'ejs');

const run = (port: number) => {
  const host = `http://${process.env.HOST ?? 'localhost'}:${port}`;

  app.get('/', (req, res) => {
    res.render('index.ejs', { host });
  });

  app.listen(port, () =>
    console.log(`Api server launched on the host: ${host}`)
  );
};

app.get('/api/users', (req, res) => {
  const users = User.users;

  res.send(users);
});

app.get('/api/user/:userName', (req, res) => {
  const { userName } = req.params;
  const user = User.get(userName);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
});

app.post('/api/user/:userName', (req, res) => {
  const { userName } = req.params;
  const user = User.getOrCreate(userName);

  res.send(user);
});

app.get('/api/rooms', (req, res) => {
  const rooms = Room.rooms;

  res.send(rooms);
});

app.get('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = Room.get(roomId);

  if (!room) {
    res.sendStatus(404);

    return;
  }

  res.send(room);
});

app.post('/api/room', (req, res) => {
  const room = new Room();

  res.send(room);
});

app.delete('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const isRemoved = Room.remove(roomId);

  if (!isRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
});

export { run };
