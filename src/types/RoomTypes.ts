import WebSocket from 'ws';

interface WSConnect extends WebSocket {
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

export { WSConnect, RoomQueryParams, ParticipantRole };
