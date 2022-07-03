import { app } from './apiServer';
import { server } from './socketServer';

server.on('request', app);

const run = () => {
  server.listen(process.env.API_PORT ?? 8080, () => {
    console.log(
      `Servers http/ws listened on ${
        process.env.HOST ? `https://${process.env.HOST}` : 'http://localhost'
      }:${process.env.API_PORT ?? 8080}`
    );
  });
};

export { run };
