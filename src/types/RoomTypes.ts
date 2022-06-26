import WebSocket from 'ws';

interface WSGame extends WebSocket {
  gameData: {
    roomId: string;
    userId: string;
  };
}

type RoomQueryParams = {
  roomId: string;
  userName: string;
};

enum ParticipantRole {
  Black = 'black',
  White = 'white',
  Watcher = 'watcher'
}

export { WSGame, RoomQueryParams, ParticipantRole };
