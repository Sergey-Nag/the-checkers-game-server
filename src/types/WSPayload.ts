enum ResponsePayloadType {
  TO_EVERYONE = 'to-everyone',
  TO_ALL_IN_ROOM = 'to-all-in-room',
  TO_ALL_IN_ROOM_EXCEPT_CURRENT = 'to-all-in-room-except-current',
  error = 'error',
  board = 'board',
  participantIn = 'participantIn',
  participantOut = 'participantOut',
  participantRole = 'participantRole',
  highlight = 'highlight',
  eat = 'eat'
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
