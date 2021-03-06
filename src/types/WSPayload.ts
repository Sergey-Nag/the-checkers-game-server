enum ResponsePayloadType {
  TO_EVERYONE = 'to-everyone',
  TO_ALL_IN_ROOM = 'to-all-in-room',
  TO_ALL_IN_ROOM_EXCEPT_CURRENT = 'to-all-in-room-except-current',
  error = 'error',
  board = 'board',
  participant = 'participant',
  highlight = 'highlight',
  eat = 'eat',
  gameStatus = 'gameStatus',
  gameOver = 'gameOver',
  moveTurn = 'moveTurn'
}

enum RequestPayloadType {
  move = 'move',
  highlight = 'highlight'
}

type RequestPayload = {
  type: RequestPayloadType;
  message?: any;
};

type ResponsePayload = {
  type: ResponsePayloadType;
  message?: any;
};

export {
  ResponsePayloadType,
  RequestPayloadType,
  RequestPayload,
  ResponsePayload
};
