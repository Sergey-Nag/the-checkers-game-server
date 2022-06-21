import express from 'express';
import cors from 'cors';
import Room from '../models/Room';

const app = express();

app.use(cors());

const run = (port: number) => {
  app.listen(port, () => console.log(`Api server launched on port: ${port}`));
};

app.get('/api/rooms', (req, res) => {
  const rooms = Room.rooms;

  res.send(rooms);
});

export { run };
