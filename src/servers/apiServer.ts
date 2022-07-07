import express from 'express';
import cors from 'cors';
import Room from '../models/Room';
import { join } from 'path';
import { apiDocRouter } from './apiDocs/apiDocs';
import User from '../models/Users/User';
import { tgAppRouter } from './tgServer/tgBotServer';

const API_PORT = process.env.API_PORT ?? 8080;

const host = process.env.HOST
  ? `https://${process.env.HOST}`
  : 'http://localhost:' + API_PORT;

const wsHost = process.env.HOST
  ? `wss://${process.env.HOST}:${API_PORT}`
  : 'ws://localhost:8080';

const app = express();

app.use(cors());
app.use(apiDocRouter);
app.use('/tg-web-app', tgAppRouter(host, wsHost));
app.set('views', join(__dirname, '../../', 'public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', { host, wsHost });
});

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

export { app };
