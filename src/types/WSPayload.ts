enum ResponsePayloadType {
  error = 'error',
  board = 'board',
  user = 'user',
  room = 'room'
}

enum RequestPayloadType {
  move = 'move'
}

export { ResponsePayloadType, RequestPayloadType };
