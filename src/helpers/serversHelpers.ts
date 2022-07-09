import { RoomQueryParams } from '../types/RoomTypes';
import {
  RequestPayload,
  RequestPayloadType,
  ResponsePayloadType
} from '../types/WSPayload';

const getRoomQueryParams = (url: string): RoomQueryParams => {
  const params = new URLSearchParams(url.slice(1));
  const roomId = params.get('roomId');
  const userName = params.get('userName');

  if (!roomId || !userName) throw 'No params';

  return { roomId, userName };
};

const payload = (type: ResponsePayloadType, message: any): string =>
  JSON.stringify({ type, message });

const errorPayload = (message: string): string =>
  payload(ResponsePayloadType.error, message);

function requestHandler(payload: RequestPayload) {
  switch (payload.type) {
    case RequestPayloadType.highlight:
      break;
  }
}

export { getRoomQueryParams, payload, errorPayload, requestHandler };
