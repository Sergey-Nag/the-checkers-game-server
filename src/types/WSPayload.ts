enum ResponsePayloadType {
  error = 'error',
  board = 'board',
  user = 'user',
  room = 'room',
  participantRole = 'participantRole',
  highlight = 'highlight'
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
